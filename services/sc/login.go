package main

import (
	"fmt"
	"html/template"
	"net/http"
)

func login(w http.ResponseWriter, _ *http.Request) {
	// content := http.Dir("templates")

	fmt.Println("You are accessing the login screen")
	tmpl, err := template.ParseFS(content, "x.html")
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
