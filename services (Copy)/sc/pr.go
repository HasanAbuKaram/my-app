package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"log"
	"net/http"
	"os"
	"time"

	_ "github.com/lib/pq" // PostgreSQL driver
)

type PRHeader struct {
	ID           int               `json:"-"`
	PRNumber     string            `json:"prNumber"`
	PRType       string            `json:"prType"`
	CreationDate string            `json:"creationDate"`
	RequiredDate string            `json:"requiredDate"`
	Documents    map[string]string `json:"documents"`
	Lines        []PRLine          `json:"lines"`
}

type PRLine struct {
	ID           int     `json:"-"`
	PRHeaderID   int     `json:"prHeaderID"`
	LineNumber   int     `json:"lineNumber"`
	Item         string  `json:"item"`
	Quantity     float64 `json:"quantity"`
	UOM          string  `json:"uom"`
	Description  string  `json:"description"`
	RequiredDate string  `json:"requiredDate"`
}

const (
	connectionString = "host=localhost user=postgres password=Dana0Yara dbname=postgres sslmode=disable" // Update connection details
	uploadPath       = "./uploads/"
)

func getCreatePR(w http.ResponseWriter, r *http.Request) {
	// Serve the HTML template for creating PR
	// Assuming you have a template engine like html/template configured
	tmpl := template.Must(template.ParseFiles("templates/createPR.html"))
	err := tmpl.Execute(w, nil) // Pass any data needed for the template (optional)
	if err != nil {
		log.Println("Error rendering createPR template:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

func createPR(w http.ResponseWriter, r *http.Request) {
	var prHeader PRHeader

	// Parse form data (including files) using multipart.Form
	err := r.ParseMultipartForm(32 << 20) // Adjust memory limit if needed
	if err != nil {
		log.Println("Error parsing multipart form:", err)
		http.Error(w, "Error processing request", http.StatusBadRequest)
		return
	}

	// Decode JSON data from form field (e.g., "prData")
	formData := r.FormValue("prData")
	err = json.Unmarshal([]byte(formData), &prHeader)
	if err != nil {
		log.Println("Error decoding JSON data:", err)
		http.Error(w, "Invalid PR data", http.StatusBadRequest)
		return
	}

	// Extract and handle uploaded files
	var documents map[string]string = make(map[string]string)
	fileMap := r.MultipartForm.File

	for _, fileHeaders := range fileMap {
		for _, fileHeader := range fileHeaders {
			file, err := fileHeader.Open()
			if err != nil {
				log.Println("Error opening uploaded file:", err)
				http.Error(w, "Error processing file upload", http.StatusInternalServerError)
				return
			}
			defer file.Close()

			// Generate a unique filename
			fileName := fmt.Sprintf("%s_%s", prHeader.PRNumber, fileHeader.Filename)
			filePath := uploadPath + fileName

			// Save the file
			dst, err := os.Create(filePath)
			if err != nil {
				log.Println("Error saving uploaded file:", err)
				http.Error(w, "Error processing file upload", http.StatusInternalServerError)
				return
			}
			defer dst.Close()

			if _, err := io.Copy(dst, file); err != nil {
				log.Println("Error copying file contents:", err)
				http.Error(w, "Error processing file upload", http.StatusInternalServerError)
				return
			}

			// Upload successful, store file path in documents map
			documents[fileHeader.Filename] = filePath
		}
	}
	prHeader.Documents = documents

	// Database operations to insert PR header and lines
	// Database connection pool (replace with your preferred connection method)
	db, err := sql.Open("postgres", connectionString)
	if err != nil {
		log.Println("Error opening database connection:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
	defer db.Close() // Close connection on function exit

	// Insert PR Header and get its ID
	prHeaderID, err := insertPRHeader(db, prHeader)
	if err != nil {
		log.Println("Error inserting PR header:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Insert PR Lines
	err = insertPRLines(db, prHeaderID, prHeader.Lines)
	if err != nil {
		log.Println("Error inserting PR lines:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}

	// Respond to client with success message and PR ID
	response := struct {
		Message string `json:"message"`
		PRID    int    `json:"prID"`
	}{
		Message: "PR created successfully",
		PRID:    prHeaderID,
	}

	w.Header().Set("Content-Type", "application/json")
	err = json.NewEncoder(w).Encode(response)
	if err != nil {
		log.Println("Error encoding response:", err)
		http.Error(w, "Internal Server Error", http.StatusInternalServerError)
		return
	}
}

// Function to insert PR lines
func insertPRLines(db *sql.DB, prHeaderID int, prLines []PRLine) error {
	stmt, err := db.Prepare("INSERT INTO pr_lines (pr_header_id, line_number, item, quantity, uom, description, required_date) VALUES ($1, $2, $3, $4, $5, $6, $7)")
	if err != nil {
		return fmt.Errorf("error preparing insert statement: %w", err)
	}
	defer stmt.Close()

	for _, prLine := range prLines {
		_, err = stmt.Exec(prHeaderID, prLine.LineNumber, prLine.Item, prLine.Quantity, prLine.UOM, prLine.Description, prLine.RequiredDate)
		if err != nil {
			return fmt.Errorf("error inserting PR line: %w", err)
		}
	}

	return nil
}

// Function to insert PR header and return generated ID
func insertPRHeader(db *sql.DB, prHeader PRHeader) (int, error) {
	stmt, err := db.Prepare("INSERT INTO pr_header (pr_number, pr_type, creation_date, required_date) VALUES ($1, $2, $3, $4) RETURNING id")
	if err != nil {
		return 0, fmt.Errorf("error preparing insert statement: %w", err)
	}
	defer stmt.Close()

	// Format creation date for database storage (adjust based on your database format)
	creationDate, err := time.Parse("2006-01-02", prHeader.CreationDate) // Assuming "YYYY-MM-DD" format
	if err != nil {
		return 0, fmt.Errorf("error parsing creation date: %w", err)
	}

	var prHeaderID int
	err = stmt.QueryRow(prHeader.PRNumber, prHeader.PRType, creationDate, prHeader.RequiredDate).Scan(&prHeaderID)
	if err != nil {
		return 0, fmt.Errorf("error inserting PR header: %w", err)
	}

	return prHeaderID, nil
}
