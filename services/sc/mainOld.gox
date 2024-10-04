package main

import (
	"bufio"
	"crypto/tls"
	_ "embed"
	"encoding/json"
	"fmt"
	"io"
	"log"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"time"
	// For decoding JWT, if needed
)

func tokenHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var requestBody struct {
		Token string `json:"token"`
	}
	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusBadRequest)
		return
	}
	err = json.Unmarshal(body, &requestBody)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	// Use the token to make a request to Microsoft Graph API
	graphResponse, err := getManagerInfo(requestBody.Token)
	if err != nil {
		http.Error(w, "Failed to get manager info", http.StatusInternalServerError)
		return
	}

	// Respond with the manager info
	response := struct {
		ManagerName string `json:"managerName"`
	}{
		ManagerName: graphResponse,
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}

func getManagerInfo(token string) (string, error) {
	req, err := http.NewRequest("GET", "https://graph.microsoft.com/v1.0/me/manager", nil)
	if err != nil {
		return "", err
	}
	req.Header.Set("Authorization", "Bearer "+token)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", err
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	var result struct {
		DisplayName string `json:"displayName"`
	}
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return "", err
	}
	err = json.Unmarshal(body, &result)
	if err != nil {
		return "", err
	}

	fmt.Println("Your manager is:", result.DisplayName)

	return result.DisplayName, nil
}

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
		// router.HandleFunc("/createPR", getCreatePR).Methods(http.MethodGet)
		// router.HandleFunc("/createPR", createPR).Methods(http.MethodPost)

		http.HandleFunc("GET /createPR", getCreatePR)
		http.HandleFunc("POST /createPR", createPR)

		// Serve static files from the 'cdn' directory
		http.Handle("/cdn/", http.StripPrefix("/cdn/", http.FileServer(http.Dir("cdn"))))
		// Serve static files from the 'static' directory
		http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
		// Serve embedded static files from the 'estatic' directory
		http.Handle("/assets/", http.StripPrefix("/", http.FileServer(http.FS(assets))))

		http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
			fmt.Fprintf(w, "Hello this is the first run!")
		})
		http.HandleFunc("/api/token", tokenHandler)
		http.HandleFunc("GET /time", serverTime)
		http.HandleFunc("GET /login", login)
		//	http.ListenAndServe(":8080", nil)
		// err := http.ListenAndServeTLS(":8080",
		// 	"./certs/server.crt", "./certs/server.key", nil)
		// if err != nil {
		// 	fmt.Println("Error: ", err)
		// }

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
