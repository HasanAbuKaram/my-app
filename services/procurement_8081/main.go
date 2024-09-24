package main

import (
	"fmt"
	"net/http"
)

func main() {
	// Handle the procurement service page
	http.HandleFunc("/procurement", procurementHandler)

	// Handle the health check endpoint
	http.HandleFunc("/health", healthHandler)

	port := "8081" // Change this port accordingly
	fmt.Printf("Starting procurement service on port %s...\n", port)
	http.ListenAndServe(":"+port, nil)
}
