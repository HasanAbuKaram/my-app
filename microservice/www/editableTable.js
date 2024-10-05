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
var table2 = new Tabulator("#items-table", {
    height:"311px",
    columns:[
        {title:"Name", field:"name", width:150, editor:"input"},
        {title:"Location", field:"location", width:130, editor:"list", editorParams:{autocomplete:"true", allowEmpty:true,listOnEmpty:true, valuesLookup:true}},
        {title:"Progress", field:"progress", sorter:"number", hozAlign:"left", formatter:"progress", width:140, editor:true},
        {title:"Gender", field:"gender", editor:"list", editorParams:{values:{"male":"Male", "female":"Female", "unknown":"Unknown"}}},
        {title:"Rating", field:"rating",  formatter:"star", hozAlign:"center", width:100, editor:true},
        {title:"Date Of Birth", field:"dob", hozAlign:"center", sorter:"date", width:140, editor:dateEditor},
        {title:"Driver", field:"car", hozAlign:"center", editor:true, formatter:"tickCross"},
    ],
});

var table = new Tabulator("#example-table", {});