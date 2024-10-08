let filesData = [];

document.getElementById('file-upload').addEventListener('change', function(event) {
    const files = event.target.files;
    for (const file of files) {
        filesData.push(file);
    }
    updateFileList();
});

function updateFileList() {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = '';
    filesData.forEach((file, index) => {
        const fileItem = document.createElement('div');
        fileItem.textContent = `File ${index + 1}: ${file.name}`;
        fileList.appendChild(fileItem);
    });
}

document.getElementById('family-form').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Store the current form and table data before submission
    const formDataBeforeSubmit = new FormData(this);
    const filesDataBeforeSubmit = [...filesData]; // Create a copy of filesData array

    const formData = new FormData(this); // Create a FormData object

    // Append each file from filesData array to the FormData object
    filesData.forEach((file, index) => {
        formData.append(`file_${index}`, file);
    });

    try {
        const response = await fetch('/submit', {
            method: 'POST',
            body: formData // Send the FormData object directly
        });

        if (response.ok) {
            // Form submitted successfully
            document.getElementById('family-form').reset(); // Clear the form
            displayNotification('Submission successful', 'success');

            // Clear the file input field
            filesData = [];
            const fileList = document.getElementById('file-list');
            fileList.innerHTML = '';

            // Remove all rows from the items table
            const itemsTableBody = document.querySelector('#items-table tbody');
            itemsTableBody.innerHTML = '';
        } else {
            // Error submitting form
            displayNotification('Failed to submit the form', 'error');
            restoreFormData(formDataBeforeSubmit);
            filesData = [...filesDataBeforeSubmit]; // Restore the original filesData array
        }
    } catch (error) {
        console.error('Error:', error);
        displayNotification('An error occurred while submitting the form', 'error');
        // Restore the form and table data
        restoreFormData(formDataBeforeSubmit);
        filesData = [...filesDataBeforeSubmit]; // Restore the original filesData array
    }
});

function restoreFormData(formData) {
    for (const [key, value] of formData.entries()) {
        if (key.endsWith('[]')) {
            // Restore values for array fields
            const inputElements = document.querySelectorAll(`[name="${key}"]`);
            inputElements.forEach((input, index) => {
                input.value = value[index];
            });
        } else {
            // Restore values for non-array fields
            const inputElement = document.querySelector(`[name="${key}"]`);
            if (inputElement) {
                inputElement.value = value;
            }
        }
    }
}

function displayNotification(message, type) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.classList.add(type);
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000); // Remove notification after 3 seconds
}

document.querySelector('#items-table tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-row')) {
        const row = event.target.closest('tr'); // Get the closest row to the clicked button
        row.remove(); // Remove the row from the table
    }
});

document.getElementById('add-item').addEventListener('click', function() {
    const itemsTableBody = document.querySelector('#items-table tbody');
    const requestedDelivery = document.getElementById('requested-by').value;
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td><input type="text" maxlength="15" name="item_description[]" required></td>
        <td>
            <select name="item_type[]" required>
                <option value="material">Material</option>
                <option value="service">Service</option>
                <option value="budget">Budgetary</option>
            </select>
        </td>
        <td><input type="number" min="1" name="item_quantity[]" required></td>
        <td><input type="text" name="item_uom[]" style="width: 50px"></td>
        <td><input type="date" name="item_rdd[]" value="${requestedDelivery}"</td>
        <td><textarea rows="4" cols="50" name="item_specification[]"  style="margin-top: 4px" required></textarea></td>
        <td><input type="text" name="item_source[]"></td>
        <td><button type="button" class="delete-row">Delete</button></td>
        `;
    itemsTableBody.appendChild(newRow);
});

// Event delegation for delete buttons
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('delete-row')) {
        const row = event.target.closest('tr'); // Get the closest row to the clicked button
        row.remove(); // Remove the row from the table
    }
});
