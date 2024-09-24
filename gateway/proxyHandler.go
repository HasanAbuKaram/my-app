package main

import (
	"html/template"
	"net/http"
	"net/http/httputil"
	"net/url"
)

// reverseProxy forwards the request to the service URL, preserving the Host header
func reverseProxy(target string) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Parse the target URL
		url, err := url.Parse(target)
		if err != nil {
			http.Error(w, "Bad Gateway", http.StatusBadGateway)
			return
		}

		// Create a reverse proxy for the target
		proxy := httputil.NewSingleHostReverseProxy(url)

		// Preserve the original Host header by setting it manually
		r.Host = url.Host

		// Forward the request to the target
		proxy.ServeHTTP(w, r)
	})
}

// proxyHandler handles the reverse proxy for different services based on the request path
func proxyHandler(w http.ResponseWriter, r *http.Request) {
	switch {
	case r.URL.Path == "/":
		serveIndex(w) // Serve the main index page
	case r.URL.Path == "/procurement":
		loadBalance(w, r) // Call loadBalance for procurement requests
	case r.URL.Path == "/maintenance":
		maintenanceURL := AppConfig.Services.Maintenance.URL
		if !serviceIsAvailable(maintenanceURL) {
			renderErrorPage(w)
			return
		}
		reverseProxy(maintenanceURL).ServeHTTP(w, r)
	default:
		renderErrorPage(w)
	}
}

func serviceIsAvailable(serviceURL string) bool {
	resp, err := http.Get(serviceURL)
	if err != nil || resp.StatusCode != http.StatusOK {
		return false
	}
	return true
}

func renderErrorPage(w http.ResponseWriter) {
	tmpl, err := template.ParseFiles("templates/error.html")
	if err != nil {
		http.Error(w, "Error loading error page", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusServiceUnavailable)
	tmpl.Execute(w, nil)
}

// OR

// const errorPage = `
// <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Service Unavailable</title>
//     <style>
//         body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
//         h1 { color: red; }
//     </style>
// </head>
// <body>
//     <h1>Service Unavailable</h1>
//     <p>The requested service is currently unavailable. Please try again later.</p>
// </body>
// </html>`

// func renderErrorPage(w http.ResponseWriter) {
//     w.Header().Set("Content-Type", "text/html")
//     w.WriteHeader(http.StatusServiceUnavailable)
//     w.Write([]byte(errorPage))
// }
