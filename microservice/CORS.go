package main

import (
	"net/http"
)

// CORS middleware function to handle preflight requests and set necessary headers
func enableCORS(handler http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		// Set CORS headers
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:8080") // Allow requests from localhost:8080
		w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")   // Allow specific methods
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")         // Allow Content-Type header

		// If it's a preflight request (OPTIONS), return immediately
		if r.Method == http.MethodOptions {
			return
		}

		// Call the original handler for other methods
		handler(w, r)
	}
}
