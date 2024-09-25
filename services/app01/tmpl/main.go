package main

import (
	"html/template"
	"net/http"
	"path/filepath"
)

func handler(w http.ResponseWriter, r *http.Request) {
	baseTmpl, err := template.ParseFiles("index.html", "wasm.html") // Parse both templates
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	err = baseTmpl.ExecuteTemplate(w, "wasm.html", nil)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}

func main() {
	http.HandleFunc("/", handler)

	// Serve static files
	http.HandleFunc("/script/", func(w http.ResponseWriter, r *http.Request) {
		filePath := r.URL.Path[len("/script/"):]
		if filepath.Ext(filePath) == ".wasm" {
			w.Header().Set("Content-Type", "application/wasm")
		}
		http.ServeFile(w, r, "script/"+filePath)
	})

	http.ListenAndServe(":8080", nil)
}
