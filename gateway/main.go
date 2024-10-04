package main

import (
	"fmt"
	"log"
	"net/http"
)

// Main entry point of the application
func main() {
	// Load the configuration from the config file
	if err := LoadConfig("config/config.json"); err != nil {
		log.Fatalf("Error loading config: %v", err) // Log error and exit
	}

	// Access and log the loaded configuration
	log.Printf("RabbitMQ URL: %s", AppConfig.RabbitMQ.URL)
	log.Printf("Proxy Listen Port: %d", AppConfig.Services.Proxy.ListenPort)

	// Set up the HTTP server with the proxy handler
	http.HandleFunc("/", proxyHandler) // All requests will be handled by proxyHandler
	// Start a goroutine with an HTTP server
	http.HandleFunc("/login", login)
	http.HandleFunc("/api/token", tokenHandler)
	http.HandleFunc("/profile", profileHandler) // Protected route
	http.HandleFunc("/logout", logoutHandler)

	// Start the proxy server
	log.Printf("Starting proxy server on :%d\n", AppConfig.Services.Proxy.ListenPort)
	log.Fatal(http.ListenAndServe(fmt.Sprintf(":%d", AppConfig.Services.Proxy.ListenPort), nil))
}
