package main

import (
	"fmt"
	"html/template"
	"net/http"
)

// login renders the login page
func login(w http.ResponseWriter, _ *http.Request) {
	fmt.Println("You are accessing the login screen")

	// Assuming you have a file system-based template
	tmpl, err := template.ParseFiles("templates/login.html")
	if err != nil {
		http.Error(w, fmt.Sprintf("Error parsing template: %v", err), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	err = tmpl.Execute(w, nil)
	if err != nil {
		http.Error(w, fmt.Sprintf("Error executing template: %v", err), http.StatusInternalServerError)
		return
	}
}
