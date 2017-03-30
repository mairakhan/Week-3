var MyData = [12, 43, 15, 25, 34];
var Labels = ['Colombia', 'Peru', 'Venezuela', 'Chile', 'Argentina'];

function setup(){
	createCanvas(800,800);
	console.log('All good ..... Proceed!');
}

function draw(){
	for (var i = 0; i < MyData.length; i++) {
		rect (80, 50 + 25*i, MyData[i]*10, 20);
		text (MyData[i], (80 + MyData[i]*10 + 10), 65 + 25*i);
	}
for (var i = 0; i < Labels.length; i++) {
	text(Labels[i], 20, 65 + 25*i);
}
}