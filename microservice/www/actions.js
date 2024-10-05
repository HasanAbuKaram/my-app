// Function to create the action menu (Delete, Duplicate)
function actionMenuFormatter(cell, formatterParams) {
    // Create the clickable element (three dots)
    var actionButton = document.createElement("div");
    actionButton.className = "clickable-element";
    actionButton.innerHTML = "&#x22EE;"; // Vertical ellipsis (three dots)

    // Create the action menu (hidden initially)
    var actionMenu = document.createElement("div");
    actionMenu.className = "popup-menu";
    // actionMenu.style.position = "absolute";
    // actionMenu.style.top = "150px";
    // actionMenu.style.bottom = "150px";

    // Create an unordered list for the menu items
    var menuList = document.createElement("ul");

    // Add "Delete" option to menu
    var deleteItem = document.createElement("li");
    deleteItem.innerHTML = "Delete";
    deleteItem.addEventListener("click", function (event) {
        event.preventDefault();
        // Delete the row
        table.deleteRow(cell.getRow());
        actionMenu.style.display = "none"; // Hide the menu
    });

    // Add "Duplicate" option to menu
    var duplicateItem = document.createElement("li");
    duplicateItem.innerHTML = "Duplicate";
    duplicateItem.addEventListener("click", function (event) {
        event.preventDefault();
        // Get row data
        var rowData = cell.getRow().getData();
        // Get the current row position
        var rowIndex = cell.getRow().getIndex();
        // Add a new row directly under the current row
        table.addRow(rowData, false, rowIndex + 1);
        actionMenu.style.display = "none"; // Hide the menu
    });

    // Append options to the menu list
    menuList.appendChild(deleteItem);
    menuList.appendChild(duplicateItem);
    actionMenu.appendChild(menuList);

    // Toggle menu visibility on button click
    actionButton.addEventListener("click", function (event) {
        event.preventDefault();
        event.stopPropagation(); // Prevent click event from propagating to the window
        // Show or hide the action menu
        if (actionMenu.style.display === "none") {
            actionMenu.style.display = "block";
        } else {
            actionMenu.style.display = "none";
        }
    });

    // Close the menu if clicked outside
    window.addEventListener("click", function (event) {
        if (actionMenu.style.display === "block" && !actionButton.contains(event.target) && !actionMenu.contains(event.target)) {
            actionMenu.style.display = "none";
        }
    });

    // Create a container div to hold the button and menu
    var actionContainer = document.createElement("div");
    actionContainer.style.position = "relative";
    actionContainer.appendChild(actionButton);
    actionContainer.appendChild(actionMenu);

    return actionContainer;
}
