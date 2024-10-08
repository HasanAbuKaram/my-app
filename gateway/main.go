package main

import (
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"os"
	"path/filepath"
)

// Main entry point of the application
func main() {
	// The target is the reverse proxy running on port 8081
	targetURL, err := url.Parse("http://localhost:8081")
	if err != nil {
		log.Fatal("Error parsing target URL:", err)
	}

	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	staticPath := filepath.Join(cwd, "common")

	fs := http.FileServer(http.Dir(staticPath))
	http.Handle("/common/", http.StripPrefix("/common/", fs))

	// Create a reverse proxy for the target server
	proxy := httputil.NewSingleHostReverseProxy(targetURL)

	http.HandleFunc("/", serveIndex)

	http.HandleFunc("/api/token", tokenHandler)

	// Proxy requests to /form and /submit to the reverse proxy at 8081
	http.HandleFunc("/procurement", func(w http.ResponseWriter, r *http.Request) {
		proxy.ServeHTTP(w, r)
	})

	log.Println("Main server running on port 8080, proxying to 8081")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
