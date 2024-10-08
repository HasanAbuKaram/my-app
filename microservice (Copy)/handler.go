package main

import (
	"encoding/json"
	"fmt"
	"net/http"
)

var formTemplate = `
<!DOCTYPE html>
<html>
<head>
	<title>Simple Form</title>
	<script>
		function submitJSON(event) {
			event.preventDefault(); // Prevent the form from refreshing the page
			const name = document.getElementById('json-name').value; // Unique ID for JSON name
			const email = document.getElementById('json-email').value; // Unique ID for JSON email

			// Send the data as JSON
			fetch('http://localhost:8081/submit-json', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ name: name, email: email })
			})
			.then(response => response.text())
			.then(data => {
				document.getElementById('result').innerText = data;
			})
			.catch(error => {
				console.error('Error:', error);
			});
		}

		function submitFormData(event) {
			event.preventDefault(); // Prevent the form from refreshing the page
			const form = document.getElementById('formData'); // Get the formData form
			const formData = new FormData(form); // Create a FormData object from the form

			// Send the data as form data
			fetch('http://localhost:8081/submit-formdata', {
				method: 'POST',
				body: formData // Use FormData directly as the body
			})
			.then(response => response.text())
			.then(data => {
				document.getElementById('result').innerText = data;
			})
			.catch(error => {
				console.error('Error:', error);
			});
		}
	</script>
</head>
<body>
	<h2>Submit Your Info</h2>
	<form id="infoForm" onsubmit="submitJSON(event)">
		Name: <input type="text" id="json-name" name="json-name"><br>
		Email: <input type="email" id="json-email" name="json-email"><br>
		<input type="submit" value="Submit as JSON">
	</form>
	<form id="formData" onsubmit="submitFormData(event)">
		<h3>Or Submit as Form Data</h3>
		Name: <input type="text" name="form-name"><br> <!-- Unique name for form data -->
		Email: <input type="email" name="form-email"><br> <!-- Unique name for form data -->
		<input type="submit" value="Submit as Form Data">
	</form>
	<p id="result"></p>
</body>
</html>`

// formHandler serves the form.
func formHandler(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "text/html")
	fmt.Fprint(w, formTemplate)
}

// submitJSONHandler handles the form submission as JSON.
func submitJSONHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		var data struct {
			Name  string `json:"name"`
			Email string `json:"email"`
		}
		err := json.NewDecoder(r.Body).Decode(&data)
		if err != nil {
			http.Error(w, "Invalid JSON", http.StatusBadRequest)
			return
		}

		// Print received JSON data as a response
		fmt.Fprintf(w, "Reverse Proxy Received Name: %s, Email: %s", data.Name, data.Email)
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}

// submitFormDataHandler handles the form submission as form data.
func submitFormDataHandler(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodPost {
		name := r.FormValue("form-name")
		email := r.FormValue("form-email")

		// Print received form data as a response
		fmt.Fprintf(w, "Received Form Data - Name: %s, Email: %s", name, email)
	} else {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
	}
}
