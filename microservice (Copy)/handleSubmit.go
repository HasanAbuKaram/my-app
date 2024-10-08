package main

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
)

func handleFormSubmit(w http.ResponseWriter, r *http.Request) {
	// Set max memory for parsing multipart forms (10 MB in this example)
	err := r.ParseMultipartForm(10 << 20) // 10 MB
	if err != nil {
		http.Error(w, "Error parsing form data", http.StatusBadRequest)
		return
	}

	// Retrieve form fields
	var header PRHeader
	header.Department = r.FormValue("department")
	header.RequestType = r.FormValue("requestType")
	header.RequestDate = r.FormValue("requestDate")
	header.Justification = r.FormValue("justification")
	header.ApprovedBudget, _ = strconv.ParseFloat(r.FormValue("approvedBudget"), 64)

	// Print the received form data for debugging
	fmt.Printf("Department: %s\n", header.Department)
	fmt.Printf("Request Type: %s\n", header.RequestType)
	fmt.Printf("Request Date: %s\n", header.RequestDate)
	fmt.Printf("Justification: %s\n", header.Justification)
	fmt.Printf("Approved Budget: %.2f\n", header.ApprovedBudget)

	// Retrieve and parse TabularJS table data
	tableDataStr := r.FormValue("tableData")
	err = json.Unmarshal([]byte(tableDataStr), &header.LineItems)
	if err != nil {
		http.Error(w, "Error parsing table data", http.StatusBadRequest)
		return
	}

	// Begin a transaction
	tx, err := db.Begin()
	if err != nil {
		http.Error(w, "Failed to start transaction", http.StatusInternalServerError)
		return
	}

	// Insert the PR header and get the generated pr_number
	prNumber, err := insertPRHeader(tx, header)
	if err != nil {
		tx.Rollback()
		http.Error(w, "Failed to insert PR header", http.StatusInternalServerError)
		return
	}

	// Insert the PR lines
	err = insertPRLines(tx, prNumber, header.LineItems)
	if err != nil {
		tx.Rollback()
		http.Error(w, "Failed to insert PR lines", http.StatusInternalServerError)
		return
	}

	// Process file uploads
	files := r.MultipartForm.File
	for _, fileHeaders := range files {
		for _, fileHeader := range fileHeaders {
			// Open the uploaded file
			file, err := fileHeader.Open()
			if err != nil {
				tx.Rollback()
				http.Error(w, "Unable to open uploaded file", http.StatusInternalServerError)
				return
			}
			defer file.Close()

			// Create a destination file on the server
			destPath := filepath.Join("uploads", fileHeader.Filename) // Ensure "uploads" folder exists
			outFile, err := os.Create(destPath)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Unable to create the file", http.StatusInternalServerError)
				return
			}
			defer outFile.Close()

			// Copy the uploaded file data to the destination file
			_, err = io.Copy(outFile, file)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Failed to save the file", http.StatusInternalServerError)
				return
			}

			// Create an Attachment object and insert it into the database
			attachment := Attachment{
				PRNumber: prNumber,
				FileName: fileHeader.Filename,
				FilePath: destPath,
			}
			err = insertAttachment(tx, attachment)
			if err != nil {
				tx.Rollback()
				http.Error(w, "Failed to save attachment metadata", http.StatusInternalServerError)
				return
			}

			// Log the successful upload
			fmt.Printf("File %s uploaded successfully\n", fileHeader.Filename)
		}
	}

	// Commit the transaction
	err = tx.Commit()
	if err != nil {
		http.Error(w, "Failed to commit transaction", http.StatusInternalServerError)
		return
	}

	// Respond with a success message
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Form and files submitted successfully"))
}
