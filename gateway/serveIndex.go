package main

import (
	"net/http"
)

// serveIndex serves the static HTML content for the home page
func serveIndex(w http.ResponseWriter) {
	htmlContent := `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Microservices Application</title>
        <style>
            body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
            button { padding: 10px 20px; font-size: 16px; margin: 10px; }
        </style>
    </head>
    <body>
        <h1>Microservices Application</h1>
        <button onclick="window.location.href='/procurement'">Procurement</button>
        <button onclick="window.location.href='/maintenance'">Maintenance</button>
    </body>
    </html>
    `
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(htmlContent))
}
