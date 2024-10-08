package main

import (
	"html/template"
	"log"
	"net/http"
	"net/http/httputil"
	"net/url"
	"sync"
)

// Global cache for parsed templates to avoid parsing them on every request
var (
	errorTemplate *template.Template
	once          sync.Once
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

// proxyHandler handles reverse proxy for different services
func proxyHandler(w http.ResponseWriter, r *http.Request) {
	switch r.URL.Path {
	case "/":
		serveIndex(w, r)
	case "/procurement":
		proxyProcurement(w, r)
		//loadBalance(w, r)
	case "/maintenance":
		loadBalance(w, r)
		proxyMaintenance(w, r)
	default:
		// http.Error(w, "Not Found", http.StatusNotFound) // More specific error handling
		renderErrorPage(w)
	}
}

func proxyProcurement(w http.ResponseWriter, r *http.Request) {
	// The target is the reverse proxy running on port 8081
	targetURL, err := url.Parse("http://localhost:8081/procurement")
	if err != nil {
		log.Fatal("Error parsing target URL:", err)
	}

	// Create a reverse proxy for the target server
	proxy := httputil.NewSingleHostReverseProxy(targetURL)

	// Proxy requests to /form and /submit to the reverse proxy at 8081
	proxy.ServeHTTP(w, r)

	log.Println("Main server running on port 8080, proxying to 8081")
}

func proxyMaintenance(w http.ResponseWriter, r *http.Request) {
	maintenanceURL := AppConfig.Services.Maintenance.URL
	if !serviceIsAvailable(maintenanceURL) {
		renderErrorPage(w)
		return
	}

	// Use the existing reverseProxy function
	reverseProxy(maintenanceURL).ServeHTTP(w, r)
}

// proxyMaintenance handles proxying requests to the maintenance service
// func proxyMaintenance(w http.ResponseWriter, r *http.Request) {
// 	maintenanceURL := AppConfig.Services.Maintenance.URL
// 	if !serviceIsAvailable(maintenanceURL) {
// 		renderErrorPage(w)
// 		return
// 	}

// 	// Parse the target URL
// 	url, err := url.Parse(maintenanceURL)
// 	if err != nil {
// 		http.Error(w, "Bad Gateway", http.StatusBadGateway)
// 		return
// 	}

// 	// Create a new reverse proxy
// 	proxy := &httputil.ReverseProxy{
// 		Director: func(req *http.Request) {
// 			// Modify request as necessary (e.g., add/remove headers)
// 			req.Host = url.Host
// 			req.URL.Scheme = url.Scheme
// 			req.URL.Host = url.Host
// 			req.Header.Add("X-Forwarded-Host", r.Host)
// 			req.Header.Add("X-Origin-Host", req.Host)
// 		},
// 		ModifyResponse: func(resp *http.Response) error {
// 			// Handle response before sending back to the client
// 			// Example: check for login/logout related headers
// 			if resp.StatusCode == http.StatusUnauthorized {
// 				// Handle unauthorized response, e.g., redirect to login page
// 			}
// 			return nil
// 		},
// 	}

// 	// Serve the proxy
// 	proxy.ServeHTTP(w, r)
// }

// serviceIsAvailable checks if the service is available
func serviceIsAvailable(serviceURL string) bool {
	resp, err := http.Get(serviceURL)
	if err != nil || resp.StatusCode != http.StatusOK {
		return false
	}
	return true
}

// renderErrorPage renders the error page when the service is unavailable
func renderErrorPage(w http.ResponseWriter) {
	once.Do(func() {
		var err error
		errorTemplate, err = template.ParseFiles("templates/error.html")
		if err != nil {
			// Fallback to inline template
			errorTemplate, _ = template.New("error").Parse(`
			<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<title>Service Unavailable</title>
				<style>
					body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
					h1 { color: red; }
				</style>
			</head>
			<body>
				<h1>Service Unavailable</h1>
				<p>The requested service is currently unavailable. Please try again later.</p>
			</body>
			</html>`)
		}
	})

	w.Header().Set("Content-Type", "text/html")
	w.WriteHeader(http.StatusServiceUnavailable)
	errorTemplate.Execute(w, nil)
}
