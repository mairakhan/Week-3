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

function draw(){
	background(255)
	for (var i = 0; i < refugeeTable.getRowCount(); i++){
		var rectLength = map(refugeeTable.getNum(i, 'Total'), 0, maxValue, 0, maxLength);
		rect(100, 50 + 20*i, rectLength, 15);
	}
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