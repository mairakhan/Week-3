// ***** Global variables ***** //
var refugeeTable;
var topRefugeesTable = new p5.Table;
var maxTotal = 0;
var maxLabel = 0;
var maxLength = 500;
var headers = ['Country','Refugees','Asylum-seekers','Returned refugees','IDPs','Returned IDPs','Stateless','Others of concern','Total']
var startChartY = 100;
var selectedButton = 5;

// ***** Preload function ***** //
function preload(){
    refugeeTable = loadTable('../data/RefugeesUNHCR.csv', 'csv', 'header');
    console.log('Done loading table...');
}

// ***** Setup function ***** //
function setup(){
    createCanvas(800, 3000);
    textSize(12);
    console.log('Setup complete...');
    print(refugeeTable.getRowCount() + ' rows loaded...');
    print(refugeeTable.getColumnCount() + ' columns loaded...');
    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        maxTotal = max(refugeeTable.getNum(i, 'Total'), maxTotal);
        maxLabel = max(refugeeTable.getString(i, 'Country').length, maxLabel);
    }
    print('Maximum total is ' + maxTotal);
    print('Maximum label length is ' + maxLabel);
    createNewTable();
}

// ****** Create new table function ******** //
function createNewTable(){
    for (var i = 0; i < headers.length; i++) {
        topRefugeesTable.addColumn(headers[i]);
    }
    for (var i = 0; i < refugeeTable.getRowCount(); i++) {
        var totalRefugees = refugeeTable.getNum(i, 'Total');
        if (totalRefugees >= 100000) {
            var newRow = topRefugeesTable.addRow()
                        for (var j = 0; j < headers.length; j++) {
                            newRow.setString(headers[j], refugeeTable.getString(i, headers[j]));
                        }
        }
    }
    print('New top refugee table created...');
        print(topRefugeesTable);
}

function drawDetails(){
    if (mouseY > 101){
    var selectedRow = 0;
    selectedRow = floor((mouseY - 100) / 14);
    text(topRefugeesTable.getString(selectedRow, 'Country'), 600, 120);
    text(topRefugeesTable.getNum(selectedRow, 'Refugees'), 600, 150);
    text(topRefugeesTable.getNum(selectedRow, 'Asylum-seekers'), 600, 180);
}
}


function drawButtons (){
  
    for (var i = 1; i < headers.length; i++){
        if (selectedButton == i){
            fill(150, 150, 150);
        }
        else {
            noFill();
        }
        stroke(0);
        strokeWeight(1);
        rect(50 + 75* i, 30, 65, 20);
        fill(0);
        noStroke();
        textAlign(CENTER, CENTER);
        text(headers[i], 90 + 75 * i , 40);
    }
}


function mousePressed(){
    if(mouseX > 125 && mouseX < 190 && mouseY > 30 && mouseY < 50 ){
selectedButton = 1;
print('selected!!!')
    }
    if(mouseX > 200 && mouseX < 265 && mouseY > 30 && mouseY < 50 ){
selectedButton = 2;
    }
    if(mouseX > 275 && mouseX < 340 && mouseY > 30 && mouseY < 50 ){
selectedButton = 3;
    }
    if(mouseX > 350 && mouseX < 415 && mouseY > 30 && mouseY < 50 ){
selectedButton = 4;
    }
    if(mouseX > 425 && mouseX < 490 && mouseY > 30 && mouseY < 50 ){
selectedButton = 5;
    }
    if(mouseX > 500 && mouseX < 565 && mouseY > 30 && mouseY < 50 ){
selectedButton = 6;
    }
    if(mouseX > 575 && mouseX < 640 && mouseY > 30 && mouseY < 50 ){
selectedButton = 7;
    }
     if(mouseX > 650 && mouseX < 715 && mouseY > 30 && mouseY < 50 ){
selectedButton = 8;
    }
}


function drawCountries(category){
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    maxTotal = 0;
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        maxTotal = max(topRefugeesTable.getNum(i, category), maxTotal)
    }
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        var total = topRefugeesTable.getNum(i, category);
        var length = map(total, 0, maxTotal, 0, maxLength);
        rect(maxLabel * 5, startChartY + 2 + 14*i, length, 12);
        text(nfc(total, 0), maxLabel * 5 + length + 5, startChartY + 14*i);
    }
    textAlign(RIGHT, TOP);
    for (var i = 0; i < topRefugeesTable.getRowCount(); i++) {
        text(topRefugeesTable.getString(i, 'Country'), maxLabel * 5 - 5, startChartY + 14*i);
    }
}

// ***** Draw function ***** //
function draw(){
    background(255);
    // drawCountries(refugeeTable);
    //drawCountries('Asylum-seekers');
    drawCountries(headers[selectedButton]);
    drawDetails();
    drawButtons();
    noStroke();
    fill(0);
    text(str(mouseX) + ', ' + str(round(mouseY)), mouseX, mouseY);
}