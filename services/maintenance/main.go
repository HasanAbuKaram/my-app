package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", maintenanceHandler)
	port := "8083" // Change this port accordingly
	fmt.Printf("Starting maintenance service on port %s...\n", port)
	http.ListenAndServe(":"+port, nil)
}
