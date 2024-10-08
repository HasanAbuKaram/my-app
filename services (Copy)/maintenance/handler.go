package main

import (
	"fmt"
	"net/http"
)

func maintenanceHandler(w http.ResponseWriter, r *http.Request) {
	host := r.Host // Get the host and port from the request
	fmt.Println("Maintenance host:", host)

	// Define the HTML response
	response := fmt.Sprintf(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Maintenance Service</title>
            <style>
                body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
                button { padding: 10px 20px; font-size: 16px; }
            </style>
        </head>
        <body>
            <h1>E-Maintenance Service</h1>
            <p>Serving from: %s</p>
            <button onclick="window.location.href='/'">Back to Main</button>
        </body>
        </html>
    `, host)

	// Write the response with the appropriate content type
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(response))
}
