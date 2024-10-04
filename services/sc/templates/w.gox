package main

import (
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"io"
	"net/http"
	"os"
	"path/filepath"
)

// Directory to store uploaded files
const uploadDir = "./uploads/"

// File represents a file uploaded by the user.
type File struct {
	Name    string `json:"name"`
	Content string `json:"content"`
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
	return template.ParseFiles("form.html")
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

	body, err := io.ReadAll(r.Body)
	if err != nil {
		http.Error(w, "Failed to read request body", http.StatusInternalServerError)
		return
	}
	defer r.Body.Close()

	var data FormData
	err = json.Unmarshal(body, &data)
	if err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to parse JSON", http.StatusBadRequest)
		return
	}

	// Create directory if it doesn't exist
	err = os.MkdirAll(uploadDir, os.ModePerm)
	if err != nil {
		fmt.Print(err)
		return
	}

	// Process uploaded files
	var files []File
	for _, file := range data.Files {
		// Decode base64-encoded file content
		content, err := base64.StdEncoding.DecodeString(file.Content)
		if err != nil {
			// Log the error for debugging
			fmt.Printf("Error decoding base64 data for file '%s': %v\n", file.Name, err)
			// Skip this file and continue to the next one
			continue
		}

		// Create a unique file name
		fileName := filepath.Join(uploadDir, file.Name)

		// Write file content to disk
		err = os.WriteFile(fileName, content, 0644)
		if err != nil {
			http.Error(w, "Failed to write file", http.StatusInternalServerError)
			return
		}

		// Add file info to FormData
		files = append(files, File{Name: file.Name, Content: fileName})
	}

	// Add uploaded files to FormData
	data.Files = files

	// Print the received data to the console
	fmt.Printf("Received data:\n%+v\n", data)

	// Respond to the client
	w.Header().Set("Content-Type", "application/json")
	response := map[string]string{"status": "success"}
	json.NewEncoder(w).Encode(response)
}

func main() {
	http.HandleFunc("/", formHandler)
	http.HandleFunc("/submit", submitHandler)
	fmt.Println("Server started at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
