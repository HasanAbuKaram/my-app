package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

// submitJSONHandler handles the form submission as JSON.
func submitJSONHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var data struct {
			Name  string `json:"name"`
			Email string `json:"email"`
		}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		// Print received JSON data as a response
		fmt.Fprintf(w, "Reverse Proxy Received Name: %s, Email: %s", data.Name, data.Email)
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

// submitFormDataHandler handles the form submission as form data.
func submitFormDataHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		name := r.FormValue("form-name")
		email := r.FormValue("form-email")

		// Print received form data as a response
		fmt.Fprintf(w, "Received Form Data - Name: %s, Email: %s", name, email)
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
