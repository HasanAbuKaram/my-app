package main

import (
	"fmt"
	"html/template"
	"net/http"
)

type sessionData struct {
	GraphUser string `json:"graphUser"` // Replace with your data structure
}

func serverTime(w http.ResponseWriter, r *http.Request) {
	// currentTime := time.Now().Format("15:04:05")

	// cookie, err := r.Cookie("graphUser")
	session, ok := r.Context().Value("graphUser").(sessionData)
	if !ok {
		fmt.Fprintf(w, "No session data found")
		return
	}

	tmpl, err := template.ParseFS(content, "index.html")
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html")
	err = tmpl.Execute(w, session)
	if err != nil {
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
}
