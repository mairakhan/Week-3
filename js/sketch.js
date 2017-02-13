var MyFirstVariable = 20;
var SecondVariable = 35;
var MyName = "Maira";
var AmIAmerican = false;
var MyArray = [12,214,514]
var MyObject = {name: "Maira", lastname: "Khan", age: 27}
var MyGlobalVariable = "Global"
var CircleSize = 50

// function preload(){

// }

function MyFirstFunction (x1,x2,x3){
	var x4 = x1*x2*x3;
	var MyLocalVariable = "Local"
	return x4;
}

function setup(){
	console.log(MyFirstVariable);
	print(MyFirstVariable);
	var ThirdVariable = MyFirstVariable + SecondVariable
	print(ThirdVariable);
	var FourthVariable = MyFirstVariable + MyName
	print(FourthVariable);
	var FifthVariable = MyFirstVariable + SecondVariable + MyName
	print(FifthVariable);
	print(typeof(FifthVariable));
	var SixthVariable =  MyName + MyFirstVariable + SecondVariable
	print(SixthVariable);
	print(MyArray[0]);
	print(MyObject["name"]);
	print(MyFirstFunction(2,3,6));
	print(MyGlobalVariable);
}

function draw(){
	print(MyFirstVariable);
}




function setup(){
	createCanvas(1000,1000);

	for(var i=0; i<100; i++){
		print(i);

	var i=0;
	while (i<100){
		var x=2;
		print(i);
		i++;	}
}



function draw(){
	background(0, 100, 100);
	if(mouseIsPressed){
		fill(255)
	}
	else{
		fill(0);
	}
	stroke(200, 0, 50);
	strokeWeight(2);
	ellipse(mouseX, mouseY, CircleSize, CircleSize);
}

