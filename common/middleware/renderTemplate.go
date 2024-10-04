package middleware

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

// Helper function to render templates based on the status code
func renderTemplate(w http.ResponseWriter, templateName string, statusCode int) {
	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}

	// Assuming your HTML templates are stored in a "templates" folder
	tmplPath := filepath.Join(cwd, "common/templates", templateName)

	// Parse and execute the template
	tmpl, err := template.ParseFiles(tmplPath)
	if err != nil {
		fmt.Println(err)
		// If template parsing fails, log the error and return a fallback error message
		http.Error(w, "An error occurred while loading the error page.", http.StatusInternalServerError)
		return
	}

	// Set the correct status code (e.g., 401 Unauthorized or 400 Bad Request)
	w.WriteHeader(statusCode)

	// Execute the template and send it as a response
	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, "An error occurred while rendering the error page.", http.StatusInternalServerError)
	}
}
