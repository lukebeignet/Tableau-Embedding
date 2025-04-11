console.log("Hi DSNY7");


const viz = document.getElementById("tableauViz");
let workbook;
let vizActiveSheet;
let dashboard;
let listSheets;


// The sheets we want to filter
let saleMap;
let totalSales;
let salesByProduct;
let salesBySegment;


//Button variables
const oregonWashingtonButton = document.getElementById("oregon_and_washington");
const clearFilterButton = document.getElementById("clear_filters");
const undoButton = document.getElementById("undo");
const filterRangeButton = document.getElementById("filter_range");


//function definitions section
function logWorkbookInformation() {
  //get the workbook
  workbook = viz.workbook;
  console.log(`1. The workbook name is: "${workbook.name}"`);


  //get the array of dashboards within the workbook
  dashboard = workbook.publishedSheetsInfo;
  dashboard.forEach(logDashboard);


  //get the active sheet
  vizActiveSheet = workbook.activeSheet;
  console.log("2. The active sheet is: " + vizActiveSheet.name);


  //list all the worksheets within the active sheet
  listSheets = vizActiveSheet.worksheets;
  listSheets.forEach(logActiveSheet);


  // Assign sheets to the variables created at the top of the script
  saleMap = listSheets.find((ws) => ws.name == "SaleMap");
  totalSales = listSheets.find((ws) => ws.name == "Total Sales");
  salesByProduct = listSheets.find((ws) => ws.name == "SalesbyProduct");
  salesBySegment = listSheets.find((ws) => ws.name == "SalesbySegment");
}


function logDashboard(dashboard) {
  index = dashboard.index;
  console.log("3. the sheet with index [" + index + "] is " + dashboard.name);
}


function logActiveSheet(worksheets) {
  index = worksheets.index;
  console.log(
    " 4. the worksheet with index [" + index + "] is " + worksheets.name
  );
}

// Functions that tell javascript what to do when buttons are clicked

function oregonWashingtonFunction() {
  //Log what's pressed
  console.log(oregonWashingtonButton.value);


  //Apply the filter to all sheets
  saleMap.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  totalSales.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesByProduct.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
  salesBySegment.applyFilterAsync("State", ["Washington", "Oregon"], "replace");
}


function clearStateFilter() {
  //Log what's pressed
  console.log(clear_filters.value);


  //Apply the filter to all sheets
  saleMap.clearFilterAsync("State");
  totalSales.clearFilterAsync("State");
  salesByProduct.clearFilterAsync("State");
  salesBySegment.clearFilterAsync("State");
}


function unDo() {
  // Log what's pressed
  console.log(undoButton.value);


  //Undo last action to viz
  viz.undoAsync();
}


//Adding range filters for map
filterRangeButton.addEventListener("click", function filterRangeFunction() {
  //Bringing in min and max values specified in our number inputs on the HTML page.
  // Have to convert these to floats for compatibility with Tableau Embedding API
  const minValue = parseFloat(document.getElementById("minValue").value);
  const maxValue = parseFloat(document.getElementById("maxValue").value);
  console.log(minValue, maxValue);
  saleMap.applyRangeFilterAsync("SUM(Sales)", {
    min: minValue,
    max: maxValue,
  });
});


//listeners
viz.addEventListener("firstinteractive", logWorkbookInformation);


//Event listeners that wait for the button click
oregonWashingtonButton.addEventListener("click", oregonWashingtonFunction);
clearFilterButton.addEventListener("click", clearStateFilter);
undoButton.addEventListener("click", unDo);
