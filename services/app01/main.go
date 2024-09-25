package main

import (
	"html/template"
	"log"
	"net/http"
)

// Define user access levels
var userAccessLevels = map[string][]string{
	"manager":           {"edit"},
	"auditor":           {"readonly"},
	"limitedAccessUser": {"readonly"},
	"supervisor":        {"edit", "no-access"},
}

// Sample data for the table
var tableData = []struct {
	ID    int
	Name  string
	Role  string
	Email string
}{
	{1, "John Doe", "manager", "john@example.com"},
	{2, "Jane Doe", "auditor", "jane@example.com"},
	{3, "Alice", "limitedAccessUser", "alice@example.com"},
	{4, "Bob", "supervisor", "bob@example.com"},
}

func main() {
	// using GET /{$} mean / only, but using GET / mean / and anything after it which may cause routes conflict
	http.Handle("GET /home", loggingMiddleware(http.HandlerFunc(homePage)))
	http.HandleFunc("GET /{$}", handler)

	// Serve wasm_exec.js file with correct MIME type
	http.HandleFunc("/wasm_exec.js", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/javascript")
		http.ServeFile(w, r, "wasm_exec.js")
	})

	// Serve wasm_exec.js file with correct MIME type
	http.HandleFunc("/main.wasm", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/wasm")
		http.ServeFile(w, r, "main.wasm")
	})

	//http.Handle("/", http.FileServer(http.Dir("./static")))
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))

	// Start the server with CSP headers
	http.ListenAndServe(":8080", nil)
}

func handler(w http.ResponseWriter, r *http.Request) {
	t, err := template.ParseFiles("template/index.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	t.Execute(w, nil)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	userType := "supervisor"
	accessLevels, ok := userAccessLevels[userType]
	if !ok {
		http.Error(w, "Invalid user type", http.StatusBadRequest)
		return
	}
	log.Println(accessLevels)

	t, err := template.ParseFiles("homePage.html")
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	data := struct {
		Title   string
		Message string
		Roles   []string
		Access  map[string]string
		Table   []struct {
			ID    int
			Name  string
			Role  string
			Email string
		}
	}{
		Title:   "Welcome",
		Message: "This is the Home Page",
		Roles:   accessLevels,
		Access:  makeAccessMap(accessLevels),
		Table:   tableData,
	}
	t.Execute(w, data)
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		log.Printf("Request received: %s %s", r.Method, r.URL.Path)
		next.ServeHTTP(w, r)
		log.Println("Request handled successfully")
	})
}

func makeAccessMap(accessLevels []string) map[string]string {
	accessMap := make(map[string]string)
	for _, level := range accessLevels {
		accessMap[level] = level
	}
	return accessMap
}
