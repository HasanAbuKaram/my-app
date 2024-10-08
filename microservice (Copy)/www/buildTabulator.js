//Build Tabulator
var tabledata = [];
var table = new Tabulator("#items-table", {
    layout:"fitColumns",
    tooltips:true,
    addRowPos:"top",
    history:true,
    pagination:"local",
    paginationSize:10,
    movableColumns:true,
    resizableRows:true,
    data:tabledata,
    // initialSort:[
    //     {column:"item", dir:"desc"},
    // ],
    height:"355px",
    columns:[
        {title:"Item", field:"item", editor:"input"},
        {title:"Qty", field:"qty", width:90, editor:"number"},
        {title:"UoM", field:"uom", width:90, editor:"list", editorParams:{values:{"ea":"Each", "kg":"Kilogram", "unknown":"Unknown"}}},
        {title:"Budget (SAR)", field:"budget", width:150, editor:"number"},
        {title:"Required by", field:"rdd",  width:150, formatter:"date", hozAlign:"center", width:100, editor:true},
        {title:"Detailed Description/Scope", field:"scope", editor:"input"},
        {title:"Recomended Source", field:"resource", editor:"input"},
     //   { title: "Actions", field: "actions", width: 100, hozAlign: "center", formatter: actionMenuFormatter }, // Use the actionMenuFormatter
        // {
        //     title: "Actions", field: "actions", width: 100, hozAlign: "center", formatter: function (cell, formatterParams) {
        //         // Add a button to delete the row
        //         var button = document.createElement("button");
        //         button.innerHTML = "Delete";
        //         button.addEventListener("click", function () {
        //             // Delete the row on button click
        //             table.deleteRow(cell.getRow());
        //         });
        //         return button;
        //     }
        // },
       {
            title: "Actions", field: "actions", width: 200, hozAlign: "center", formatter: function (cell, formatterParams) {
                // Create a div to hold both buttons
                var actionsDiv = document.createElement("div");

                // Add the "Delete" button
                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.style.marginRight = "5px";
                deleteButton.addEventListener("click", function (event) {
                    // Prevent default button behavior
                    event.preventDefault();

                    // Delete the row on button click
                    table.deleteRow(cell.getRow());
                });

                // Add the "Duplicate" button
                var duplicateButton = document.createElement("button");
                duplicateButton.innerHTML = "Duplicate";
                duplicateButton.addEventListener("click", function (event) {
                    // Prevent default button behavior
                    event.preventDefault();

                    // Get row data
                    var rowData = cell.getRow().getData();

                    // Get the current row position
                    var rowIndex = cell.getRow().getIndex();

                    // Add a new row directly under the current row
                    table.addRow(rowData, false, rowIndex + 1);
                });

                // Append both buttons to the actions div
                actionsDiv.appendChild(deleteButton);
                actionsDiv.appendChild(duplicateButton);

                return actionsDiv;
            }
        },
    ],
});

//Add row on "Add Row" button click
document.getElementById("add-row").addEventListener("click", function(){
    // Add the new row at the bottom by setting the second argument to false
    table.addRow({}, false);
});


//Delete row on "Delete Row" button click
document.getElementById("del-row").addEventListener("click", function(){
    table.deleteRow(1);
});

//Clear table on "Empty the table" button click
document.getElementById("clear").addEventListener("click", function(){
    table.clearData()
});

//Reset table contents on "Reset the table" button click
document.getElementById("reset").addEventListener("click", function(){
    table.setData(tabledata);
});
