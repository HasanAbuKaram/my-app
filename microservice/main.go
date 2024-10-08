package main

import (
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
	db, err = sql.Open("postgres", "user=admin@pg dbname=postgres password=mypgdbpass sslmode=disable")
	if err != nil {
		fmt.Println("Error connecting to the database:", err)
		return
	}
	fmt.Println("Database is ready")
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
	// Serve the form on /form
	http.HandleFunc("/procurement", procurementHandler(cwd))

	// Handle the JSON submission on /submit-json and enable CORS
	http.HandleFunc("/submit-json", enableCORS(submitJSONHandler))

	// Handle the form data submission on /submit-formdata and enable CORS
	http.HandleFunc("/submit-formdata", enableCORS(submitFormDataHandler))

	// Serve the form submission endpoint
	http.HandleFunc("/submit", enableCORS(handleFormSubmit))

	log.Println("Server running on port 8081")
	log.Fatal(http.ListenAndServe(":8081", nil))
}
