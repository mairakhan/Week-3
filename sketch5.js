var refugeeTable;
var maxLength = 750;
var maxValue = 0;
var topRefugeeCountries = new p5.Table 

function preload (){
	refugeeTable = loadTable('../data/RefugeesUNHCR.csv', 'csv', 'header')
	console.log('Done loading Table.....')
	}

function setup(){
	createCanvas(800,3000);
	textAlign(RIGHT, TOP);
	print(refugeeTable);
	print(refugeeTable.getRowCount());
	print(refugeeTable.getColumnCount());
	for (var i = 0; i < refugeeTable.getRowCount(); i++){
		maxValue = max(maxValue, refugeeTable.getNum(i, 'Total'));
	}
	print(maxValue);
	createNewTable();
}

function createNewTable(){
	topRefugeeCountries.addColumn('Country');
	topRefugeeCountries.addColumn('Total');
	var minimumRefugees = 100000;
	for(var i = 0; i < refugeeTable.getRowCount(); i++){
	var thisTotal = refugeeTable.getNum(i, 'Total');
	if (thisTotal >= minimumRefugees){
		var newRow = topRefugeeCountries.addRow();
		newRow.setString('Country', refugeeTable.getString(i, 'Country'));
		new.setNum('Total', thisTotal);
		}
	}
print('Created new table of top refugee countries....')
print(topRefugeeCountries)
}

function drawCountries(tableName){
    fill(0);
    noStroke();
    textAlign(LEFT, TOP);
    for (var i = 0; i < tableName.getRowCount(); i++) {
        var total = tableName.getNum(i, 'Total');
        var length = map(total, 0, maxTotal, 0, maxLength);
        rect(maxLabel * 5, 2 + 14*i, length, 12);
        text(nfc(total, 0), maxLabel * 5 + length + 5, 14*i);
    }
    textAlign(RIGHT, TOP);
    for (var i = 0; i < tableName.getRowCount(); i++) {
        text(tableName.getString(i, 'Country'), maxLabel * 5 - 5, 14*i);
    }
}