package main

import (
	"fmt"
	"html/template"
	"log"
	"net/http"
	"path/filepath"
	"sync/atomic"
)

var activeConnections int32 // Atomic counter to track active connections

// procurementHandler serves the procurement page
func procurementHandler(cwd string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		host := r.Host // Get the host and port
		fmt.Println("Procurement host:", host)

		// Increment active connections
		atomic.AddInt32(&activeConnections, 1)
		defer atomic.AddInt32(&activeConnections, -1) // Decrement active connections when done

		// Build the template path
		indexPath := filepath.Join(cwd, "microservice/templates", "index.html")
		templatePath := filepath.Join(cwd, "common/templates", "base.html")
		tmpl, err := template.ParseFiles(indexPath, templatePath)
		if err != nil {
			log.Fatal(err)
		}

		data := struct {
			Title   string
			Heading string
		}{
			Title:   "PR Creation",
			Heading: "Create Purchase Request",
		}
		tmpl.ExecuteTemplate(w, "base.html", data)
	}
}
