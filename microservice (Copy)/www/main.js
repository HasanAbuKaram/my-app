//Create Date Editor
var dateEditor = function(cell, onRendered, success, cancel){
    //cell - the cell component for the editable cell
    //onRendered - function to call when the editor has been rendered
    //success - function to call to pass thesuccessfully updated value to Tabulator
    //cancel - function to call to abort the edit and return to a normal cell

    //create and style input
    var cellValue = luxon.DateTime.fromFormat(cell.getValue(), "dd/MM/yyyy").toFormat("yyyy-MM-dd"),
    input = document.createElement("input");

    input.setAttribute("type", "date");

    input.style.padding = "4px";
    input.style.width = "100%";
    input.style.boxSizing = "border-box";

    input.value = cellValue;

    onRendered(function(){
        input.focus();
        input.style.height = "100%";
    });

    function onChange(){
        if(input.value != cellValue){
            success(luxon.DateTime.fromFormat(input.value, "yyyy-MM-dd").toFormat("dd/MM/yyyy"));
        }else{
            cancel();
        }
    }

    //submit new value on blur or change
    input.addEventListener("blur", onChange);

    //submit new value on enter
    input.addEventListener("keydown", function(e){
        if(e.keyCode == 13){
            onChange();
        }

        if(e.keyCode == 27){
            cancel();
        }
    });

    return input;
};


//Build Tabulator
var table = new Tabulator("#items-table", {
    height:"311px",
    columns:[
        {title:"Item", field:"item", width:150, editor:"input"},
        {title:"Qty", field:"qty", editor:"number"},
        {title:"UoM", field:"gender", editor:"list", editorParams:{values:{"ea":"Each", "kg":"Kilogram", "unknown":"Unknown"}}},
        {title:"Budget (SAR)", field:"budget", editor:"number"},
        {title:"Required by", field:"rdd",  formatter:"date", hozAlign:"center", width:100, editor:true},
        {title:"Detailed Description/Scope", field:"scope", editor:"input"},
        {title:"Recomended Source", field:"recSource", editor:"input"},
    ],
});

//Add row on "Add Row" button click
document.getElementById("add-row").addEventListener("click", function(){
    table.addRow({});
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

// Initialize all input of date type.
const calendars = bulmaCalendar.attach('[type="date"]', options);

// Loop on each calendar initialized
calendars.forEach(calendar => {
	// Add listener to select event
	calendar.on('select', date => {
		console.log(date);
	});
});

// To access to bulmaCalendar instance of an element
const element = document.querySelector('#my-element');
if (element) {
	// bulmaCalendar instance is available as element.bulmaCalendar
	element.bulmaCalendar.on('select', datepicker => {
		console.log(datepicker.data.value());
	});
}
