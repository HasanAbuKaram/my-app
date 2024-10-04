package main

import (
	"common/middleware"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func main() {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	staticPath := filepath.Join(cwd, "common")

	fs := http.FileServer(http.Dir(staticPath))
	http.Handle("/common/", http.StripPrefix("/common/", fs))

	// Handle the health check endpoint
	http.HandleFunc("/health", healthHandler)

	// Set up the route with the cwd passed to the handler
	http.HandleFunc("/procurement", procurementHandler(cwd))

	// Start the server
	port := "8081" // Change this port accordingly
	fmt.Printf("Starting micro service on port %s...\n", port)
	// err = http.ListenAndServe(":"+port, nil)
	err = http.ListenAndServe(":"+port, middleware.AuthMiddleware(http.DefaultServeMux))
	if err != nil {
		log.Fatal(err)
	}
}
