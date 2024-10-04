package main

import (
	"html/template"
	"net/http"
	"path/filepath"
)

// serveIndex renders the HTML template based on authentication status
func serveIndex(w http.ResponseWriter, r *http.Request) {
	// Check for MSAL authentication cookie
	if _, err := r.Cookie("auth_token"); err == nil {
		// User is authenticated, load the dashboard
		renderTemplate(w, "dashboard.html")
	} else {
		// User is not authenticated, load the login page
		renderTemplate(w, "index.html")
	}
}

// renderTemplate renders the specified HTML template
func renderTemplate(w http.ResponseWriter, templateName string) {
	// Parse the template file
	tmpl, err := template.ParseFiles(filepath.Join("./gateway/", "templates", templateName))
	if err != nil {
		http.Error(w, "Error loading template", http.StatusInternalServerError)
		return
	}

	// Execute the template and render it to the response writer
	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, "Error rendering template", http.StatusInternalServerError)
	}
}
