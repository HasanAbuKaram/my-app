package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync/atomic"
)

var activeConnections int32 // Atomic counter to track active connections

// procurementHandler serves the procurement page
func procurementHandler(w http.ResponseWriter, r *http.Request) {
	host := r.Host // Get the host and port
	fmt.Println("Procurement host:", host)

	// Increment active connections
	atomic.AddInt32(&activeConnections, 1)
	defer atomic.AddInt32(&activeConnections, -1) // Decrement active connections when done

	// Define the HTML response
	response := fmt.Sprintf(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Procurement Service</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
                button { padding: 10px 20px; font-size: 16px; }
            </style>
        </head>
        <body>
            <h1>E-Procurement Service</h1>
            <p>Serving from: %s</p>
			<p>Active connections: %d</p>
            <button onclick="window.location.href='/'">Back to Main</button>
        </body>
        </html>
    `, host, activeConnections)

	// Write the response with the appropriate content type
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}

// healthHandler serves the health check information including active connections
func healthHandler(w http.ResponseWriter, r *http.Request) {
	// Create a struct to hold health data
	healthData := struct {
		Status            string `json:"status"`
		ActiveConnections int    `json:"active_connections"`
	}{
		Status:            "ok",                                      // Health status
		ActiveConnections: int(atomic.LoadInt32(&activeConnections)), // Get current active connections count
	}

	host := r.Host // Get the host and port
	fmt.Println("Procurement host:", host, ", active connections: ", healthData.ActiveConnections)
	// Encode the health data to JSON and send the response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(healthData)
}
