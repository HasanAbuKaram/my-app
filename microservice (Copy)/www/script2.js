const form = document.getElementById('request-form');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const formData = new FormData(form); // Create a FormData object
    console.log(formData.entries())
});
