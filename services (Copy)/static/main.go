package main

import (
	"bufio"
	"crypto/tls"
	_ "embed"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"
	// For decoding JWT, if needed
)

func main() {
	fmt.Printf("Hello, man! Running version %s\n", version)

	// Define the file paths for the certificate and key
	certFile := "./certs/server.crt" // "path/to/your/cert.pem" // 	, , nil)
	keyFile := "./certs/server.key"  // "path/to/your/key.pem"

	// Perform the first update check immediately
	checkForUpdates()

	// Then check for updates every hour
	ticker := time.NewTicker(30 * time.Minute)
	defer ticker.Stop()

	// Create a channel to listen for incoming signals
	sigs := make(chan os.Signal, 1)

	// Register the channel to receive os.Interrupt signals
	signal.Notify(sigs, os.Interrupt)

	go func() {
		for {
			// Wait for an os.Interrupt signal
			sig := <-sigs

			// Ask for user input when an os.Interrupt signal is received
			if sig == os.Interrupt {
				reader := bufio.NewReader(os.Stdin)
				fmt.Print("Are you sure you want to exit? (y/n): ")
				text, _ := reader.ReadString('\n')
				text = strings.TrimSpace(text) // remove leading and trailing whitespace
				if text == "y" || text == "Y" {
					fmt.Println("Exiting...")
					os.Exit(0)
				} else {
					fmt.Println("Continuing...")
				}
			}
		}
	}()

	// Start a goroutine with an HTTP server
	go func() {
		// Serve static files from the 'cdn' directory
		http.Handle("/cdn/", http.StripPrefix("/cdn/", http.FileServer(http.Dir("cdn"))))
		// Serve embedded static files from the 'estatic' directory
		http.Handle("/assets/", http.StripPrefix("/", http.FileServer(http.FS(assets))))

		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			host := r.Host // Get the host and port from the request
			fmt.Fprintf(w, "Hello this is: %s", host)
		})

		// Check if the certificate and key files exist
		if _, err := os.Stat(certFile); os.IsNotExist(err) {
			log.Println("Certificates not found, starting HTTP server...")
			// Start an HTTP server if no certificates exist
			log.Fatal(http.ListenAndServe(":8080", nil))
			return
		}

		if _, err := os.Stat(keyFile); os.IsNotExist(err) {
			log.Println("Key file not found, starting HTTP server...")
			// Start an HTTP server if no key file exists
			log.Fatal(http.ListenAndServe(":8080", nil))
			return
		}

		log.Println("Certificates found, starting HTTPS server...")
		// Create a TLS config with the certificate and key files
		cert, err := tls.LoadX509KeyPair(certFile, keyFile)
		if err != nil {
			log.Fatalf("Error loading certificates: %v", err)
		}
		tlsConfig := &tls.Config{Certificates: []tls.Certificate{cert}}

		server := &http.Server{
			Addr:      ":8443",
			Handler:   nil, // Use default handler or define your own
			TLSConfig: tlsConfig,
		}

		// Start an HTTPS server if certificates exist
		log.Fatal(server.ListenAndServeTLS(certFile, keyFile))
	}()

	for {
		<-ticker.C
		checkForUpdates()
	}
}
