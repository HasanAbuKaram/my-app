package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strconv"
	"time"
)

// Directory to store uploaded files
const uploadDir = "./uploads/"

// File represents a file uploaded by the user.
type File struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

// FormData represents the structure of the form data.
type FormData struct {
	FirstName         string   `json:"first_name"`
	LastName          string   `json:"last_name"`
	ParentNationality string   `json:"parent_nationality"`
	KidName           []string `json:"kid_name"`
	KidGender         []string `json:"kid_gender"`
	KidAge            []string `json:"kid_age"`
	KidBirthday       []string `json:"kid_birthday"`
	KidNationality    []string `json:"kid_nationality"`
	Files             []File   `json:"files"`
}

func loadTemplate() (*template.Template, error) {
	return template.ParseFiles("index.html")
}

func formHandler(w http.ResponseWriter, r *http.Request) {
	tmpl, err := loadTemplate()
	if err != nil {
		http.Error(w, "Failed to load template", http.StatusInternalServerError)
		return
	}
	tmpl.Execute(w, nil)
}

func submitHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	err := r.ParseMultipartForm(10 << 20) // Parse the multipart form data with a max size of 10 MB
	if err != nil {
		http.Error(w, "Failed to parse multipart form", http.StatusInternalServerError)
		return
	}

	// Get the FormData fields
	firstName := r.FormValue("first_name")
	lastName := r.FormValue("last_name")
	parentNationality := r.FormValue("parent_nationality")

	// Process uploaded files
	var files []File
	for _, headers := range r.MultipartForm.File {
		for _, header := range headers {
			file, err := header.Open()
			if err != nil {
				http.Error(w, "Failed to open uploaded file", http.StatusInternalServerError)
				return
			}
			defer file.Close()

			// Generate a unique file name by appending timestamp
			fileName := generateFileName(header.Filename)

			// Write file content to disk or process it as needed
			// Example: save the file to disk
			filePath := filepath.Join(uploadDir, fileName)
			outFile, err := os.Create(filePath)
			if err != nil {
				http.Error(w, "Failed to create file", http.StatusInternalServerError)
				return
			}
			defer outFile.Close()

			_, err = io.Copy(outFile, file)
			if err != nil {
				http.Error(w, "Failed to write file", http.StatusInternalServerError)
				return
			}

			// Add file info to the files slice
			files = append(files, File{Name: header.Filename, Path: filePath})
		}
	}

	// Print parent data
	fmt.Println("Parent Information:")
	fmt.Printf("First Name: %s\n", firstName)
	fmt.Printf("Last Name: %s\n", lastName)
	fmt.Printf("Nationality: %s\n", parentNationality)

	// Print kids information
	fmt.Println("\nKids Information:")
	for i, kidName := range r.Form["kid_name[]"] {
		fmt.Printf("Kid %d:\n", i+1)
		fmt.Printf("Name: %s\n", kidName)
		// Print other kid information as needed
	}

	// Print file information
	fmt.Println("\nUploaded Files:")
	for _, file := range files {
		fmt.Printf("File Name: %s\n", file.Name)
		fmt.Printf("File Path: %s\n", file.Path)
	}

	// Simulate success or error based on some condition
	success := true // You should implement your own logic here

	// Send response to client
	if success {
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusInternalServerError)
	}

	// Respond to the client
	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{"status": "success"}
	if !success {
		response = map[string]string{"status": "error"}
	}
	json.NewEncoder(w).Encode(response)
}

func generateFileName(originalName string) string {
	timestamp := strconv.FormatInt(time.Now().UnixNano(), 10) // Current timestamp in nanoseconds
	ext := filepath.Ext(originalName)
	nameWithoutExt := originalName[0 : len(originalName)-len(ext)] // Get name without extension
	return nameWithoutExt + "_" + timestamp + ext
}

func main() {
	http.HandleFunc("/", formHandler)
	http.HandleFunc("/submit", submitHandler)

	// Serve static files (CSS and JavaScript)
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("."))))

	// Serve dist files (CSS and JavaScript)
	http.Handle("/dist/", http.StripPrefix("/dist/", http.FileServer(http.Dir("dist/"))))

	fmt.Println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
