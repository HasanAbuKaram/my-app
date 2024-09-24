package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"net/http/httptest"
	"sync"
	"time"
)

// Struct to hold health data returned from /health endpoint
type HealthResponse struct {
	Status            string `json:"status"`
	ActiveConnections int    `json:"active_connections"`
}

// loadBalance function performs load balancing by selecting the server with the fewest active connections
func loadBalance(w http.ResponseWriter, r *http.Request) {
	// Get the procurement service URL with the fewest active connections
	serviceURL, err := getLeastActiveProcurementServiceURL()
	if err != nil {
		renderErrorPage(w)
		return
	}

	// Create a new request to forward to the selected procurement service
	req, err := http.NewRequest(r.Method, serviceURL+r.URL.Path, r.Body)
	if err != nil {
		renderErrorPage(w)
		return
	}

	// Copy the original request headers to the new request
	req.Header = r.Header

	// Use a response recorder to capture the response from the reverse proxy
	resp := httptest.NewRecorder()
	reverseProxy(serviceURL).ServeHTTP(resp, req)

	// Write the response back to the original response writer
	w.WriteHeader(resp.Code)
	io.Copy(w, resp.Body)
}

// getLeastActiveProcurementServiceURL queries all procurement services' /health endpoints
// and returns the URL with the fewest active connections
func getLeastActiveProcurementServiceURL() (string, error) {
	services := AppConfig.Services.Procurement

	var wg sync.WaitGroup
	wg.Add(len(services))

	// Channel to gather health check results
	results := make(chan HealthResult, len(services))
	timeout := 2 * time.Second // Set a timeout for health checks

	// Query the /health endpoint of each procurement service
	for _, service := range services {
		go func(serviceURL string) {
			defer wg.Done()

			// Create an HTTP client with a timeout
			client := &http.Client{
				Timeout: timeout,
			}

			// Call the /health endpoint
			resp, err := client.Get(serviceURL + "/health")
			if err != nil {
				results <- HealthResult{URL: serviceURL, ActiveConnections: int(^uint(0) >> 1)} // Max int value if the service is unavailable
				return
			}
			defer resp.Body.Close()

			// Decode the JSON response
			var health HealthResponse
			if err := json.NewDecoder(resp.Body).Decode(&health); err != nil || health.Status != "ok" {
				results <- HealthResult{URL: serviceURL, ActiveConnections: int(^uint(0) >> 1)} // Max int value for error
				return
			}

			// Send the result to the channel
			results <- HealthResult{URL: serviceURL, ActiveConnections: health.ActiveConnections}
		}(service.URL)
	}

	// Wait for all goroutines to finish
	wg.Wait()
	close(results)

	// Find the service with the fewest active connections
	minConnections := int(^uint(0) >> 1) // Max int value
	var bestServiceURL string

	for result := range results {
		if result.ActiveConnections < minConnections {
			minConnections = result.ActiveConnections
			bestServiceURL = result.URL
		}
	}

	if bestServiceURL == "" {
		return "", fmt.Errorf("no available procurement services")
	}

	// Return the service URL with the fewest active connections
	return bestServiceURL, nil
}

// HealthResult holds the result of querying a /health endpoint
type HealthResult struct {
	URL               string
	ActiveConnections int
}
