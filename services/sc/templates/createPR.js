// Function to add a new line item
function addLine() {
  // Create a new line item element
  const lineItem = document.createElement('div');
  lineItem.classList.add('line-item');

  // Add item and other line item fields (as needed)
  const itemLabel = document.createElement('label');
  itemLabel.textContent = "Item:";
  lineItem.appendChild(itemLabel);

  const itemInput = document.createElement('input');
  itemInput.type = "text";
  itemInput.id = "item";
  itemInput.name = "item";
  itemInput.required = true;
  lineItem.appendChild(itemInput);

  const quantityLabel = document.createElement('label');
  quantityLabel.textContent = "Quantity:";
  lineItem.appendChild(quantityLabel);

  const quantityInput = document.createElement('input');
  quantityInput.type = "number";
  quantityInput.id = "quantity";
  quantityInput.name = "quantity";
  quantityInput.required = true;
  lineItem.appendChild(quantityInput);

  const uomLabel = document.createElement('label');
  uomLabel.textContent = "UoM:";
  lineItem.appendChild(uomLabel);

  const uomInput = document.createElement('input');
  uomInput.type = "text";
  uomInput.id = "uom";
  uomInput.name = "uom";
  lineItem.appendChild(uomInput);

  // Add a label and input for line required date
  const lineRequiredDateLabel = document.createElement('label');
  lineRequiredDateLabel.textContent = "Required Date:";
  lineItem.appendChild(lineRequiredDateLabel);

  const lineRequiredDateInput = document.createElement('input');
  lineRequiredDateInput.type = "date";
  lineRequiredDateInput.id = "lineRequiredDate";
  lineRequiredDateInput.name = "lineRequiredDate";
  // Set default value to PR header date
  const prHeaderDate = document.getElementById("requiredDate").value;
  lineRequiredDateInput.value = prHeaderDate;
  lineItem.appendChild(lineRequiredDateInput);

  // Append the new line item to the container
  document.getElementById("prLines").appendChild(lineItem);
}

// Function to serialize form data including JSON data
function serializeForm() {
  const formData = new FormData();

  // Serialize PRHeader fields
  formData.append("prNumber", document.getElementById("prNumber").value);
  formData.append("prType", document.getElementById("prType").value);
  formData.append("requiredDate", document.getElementById("requiredDate").value);

  // Serialize PRLines
  const lineItems = document.querySelectorAll(".line-item");
  const lines = [];

  lineItems.forEach(item => {
    const line = {
      item: item.querySelector("[name='item']").value,
      quantity: item.querySelector("[name='quantity']").value,
      uom: item.querySelector("[name='uom']").value,
      requiredDate: item.querySelector("[name='lineRequiredDate']").value
    };
    lines.push(line);
  });

  formData.append("lines", JSON.stringify(lines));

  // Serialize PRHeader
const prHeader = {
  prNumber: document.getElementById("prNumber").value,
  prType: document.getElementById("prType").value,
  requiredDate: document.getElementById("requiredDate").value
};

formData.append("prHeader", JSON.stringify(prHeader));

  // Append uploaded files
  const fileInput = document.getElementById('fileUpload');
  const files = fileInput.files;

  for (let i = 0; i < files.length; i++) {
    formData.append('fileUpload', files[i]);
  }

  return formData;
}

// Add event listener to the form for form submission
const form = document.getElementById("prForm");

form.addEventListener("submit", function(event) {
  event.preventDefault(); // Prevent default form submission

  const formData = serializeForm(); // Serialize form data

  fetch("/createPR", {
    method: "POST",
    body: formData
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }) // Parse JSON response
  .then(data => {
    // Handle successful response (e.g., display confirmation message)
    console.log("PR submitted successfully:", data);
  })
  .catch(error => {
    // Handle errors (e.g., display error message)
    console.error("Error submitting PR:", error);
  });
});
