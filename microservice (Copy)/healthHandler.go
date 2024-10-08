package main

import (
	"encoding/json"
	"fmt"
	"net/http"
	"sync/atomic"
)

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
