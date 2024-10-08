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