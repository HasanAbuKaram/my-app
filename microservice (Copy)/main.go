package main

import (
	"common/middleware"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

var db *sql.DB // Global database variable

func main() {

	var err error
	// Connect to the PostgreSQL database
	db, err = sql.Open("postgres", "user=username dbname=mydb password=mypassword sslmode=disable")
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return
	}
	defer db.Close()

	cwd, err := os.Getwd()
	if err != nil {
		log.Fatal(err)
	}
	// Define global static files, that are common for the workspace
	staticPath := filepath.Join(cwd, "common")
	static := http.FileServer(http.Dir(staticPath))
	http.Handle("/common/", http.StripPrefix("/common/", static))

	// Define the microservice related static files, that have nothing to do with other microservices
	www := filepath.Join(cwd, "microservice")
	public := http.FileServer(http.Dir(www))
	http.Handle("/www/", http.StripPrefix("/", public))

	// Handle the health check endpoint
	http.HandleFunc("/health", healthHandler)

	// Set up the route with the cwd passed to the handler
	http.HandleFunc("/procurement", procurementHandler(cwd))

	// Create a directory to store uploaded files
	if err := os.MkdirAll("uploads", os.ModePerm); err != nil {
		log.Fatal(err)
	}

	// Serve the form submission endpoint
	http.HandleFunc("/submit", enableCORS(handleFormSubmit))
	// http.HandleFunc("/submit", submitHandler)
	// Handle the JSON submission on /submit-json and enable CORS
	//http.HandleFunc("/submit-json", enableCORS(submitJSONHandler))

	// Start the server
	port := "8081" // Change this port accordingly
	fmt.Printf("Starting micro service on port %s...\n", port)
	// err = http.ListenAndServe(":"+port, nil)
	err = http.ListenAndServe(":"+port, middleware.AuthMiddleware(http.DefaultServeMux))
	if err != nil {
		log.Fatal(err)
	}
}
