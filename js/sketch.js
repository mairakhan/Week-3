// ***** Global variables ***** //
var apiKey = '1934a3cfafeecec67d0d0f3d1f2c6e3c';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units = 'metric';
var weatherData;
var temperature = 0;
var humidity = 0;
//var iconURL;
var icon;
var button;

//Severity levels
var SEVERITY_FREEZING = 0;
var SEVERITY_COLD = 1;
var SEVERITY_WARM = 2;
var SEVERITY_HOT = 3;

var severityColors = {};
severityColors[SEVERITY_FREEZING] = {'R': 0, 'G': 0, 'B': 204};
severityColors[SEVERITY_COLD] = {'R': 0, 'G': 204, 'B': 204};
severityColors[SEVERITY_WARM] = {'R': 255, 'G': 255, 'B': 153};
severityColors[SEVERITY_HOT] = {'R': 153, 'G': 0, 'B': 0};


// ***** Setup function ***** //
function setup(){

createCanvas(1400,1200);
button = select("#submit");
city = select("#city");
button.mousePressed(queryAPI)
}

function queryAPI(){
var query = baseURL + city.value() +'&apiKey=' + apiKey + '&units=' + units;
loadJSON(query,getWeatherData);
//console.log('here we querried/ called the api and added the data to getWeatherData');
}

function getWeatherData(apiData){
weatherData = apiData; 
name = weatherData.name;
country = weatherData.sys.country;
latitude = weatherData.coord.lat;
longitude = weatherData.coord.lon; 
temperature = weatherData.main.temp;
minTemp = weatherData.main.temp_min;
maxTemp = weatherData.main.temp_max;
WDescription = weatherData.weather[0].description;
humidity = weatherData.main.humidity;
speed = weatherData.wind.speed;
clouds = weatherData.clouds.all;
windDeg = weatherData.wind.deg;



//iconURL = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";

console.log(weatherData);
}


// Draw a grid for refernce of x and y coordinates
function drawGrid() {
	stroke(200, 200, 200);
	fill(255, 255, 255);

	for (var i=0; i<32; i++) {
		for (var j=0; j<32; j++) {
			rect(i*50, j*50, 50, 50 );
		}
	}
}


// Text size 1
function drawText1() {
	fill(255);
    noStroke();
    textSize(40);

    if (weatherData){
        text(name, 150, 150);
	}
}

// Text size 2
function drawText2() {
	fill(255);
    noStroke();
    textSize(30);

    if (weatherData){
        text(temperature + "\xB0" + " C ", 150, 240);
	}
}

// Text size 3
function drawText3() {
	fill(255);
    noStroke();
    textSize(15);

    if (weatherData){
       text("Country: " + country + " / Latitude: " + latitude + " / Longitude: " + longitude, 150, 175);
       text("Minimum Temperature: " + minTemp + " / Maximum Temperature " + maxTemp, 150, 265);
       	   }
}

//Text size 4
function drawText4() {
    fill(255);
    noStroke();
    textSize(20);
      if (weatherData){
      //text("Celsius", 230, 190);
      //text(WDescription, 965, 215);
        text("Humidity", 215, 590);
        text("Wind Speed", 445, 590);
        text("Wind Direction", 710, 590);
        text("Clouds", 975, 590);

        text("in % ", 235, 615);
        text("in meter/s ", 455, 615);
        text("in degrees", 725, 615);
        text("in % ", 990, 615);

        text(WDescription, 1015, 265);
      }   
}


// Pie Chart Function
function drawPie(x, y, width, height, value, maxValue, color) {
    noStroke();
  	var ratio = value/ maxValue;

  	if (ratio >= 1) {
  	ratio = 0.999
  	}

    //fill('rgba(' + color.R + ', ' + color.G + ', ' + color.B + ', 0.17)');
    fill(200);
    ellipse(x, y, width, height);
    
    fill(color.R, color.G, color.B);
    arc(x, y, width, height, -HALF_PI, -HALF_PI + (ratio * 2*PI), PIE);
    
    fill(255);
    ellipse(x, y, width - 30, height - 30);

    fill('rgba(0,0,0,0.5)');
    ellipse(x, y, width - 30, height - 30);
}

// Get severity values
function getSeverity(temperature) {
    var severity;

    if (temperature < 0) {
        severity = SEVERITY_FREEZING;
    }
    else if (temperature < 10) {
        severity = SEVERITY_COLD;
    }
    else if (temperature < 25) {
        severity = SEVERITY_WARM;
    }
    else {
        severity = SEVERITY_HOT;
    }

    return severity;
}


// ***** Draw function ***** //
function draw(){


loadImage("../img/world_map.jpg", function(img){
image(img,0,0);
});

//background(255)
	//drawGrid()

    if (weatherData){
        var severity = getSeverity(weatherData.main.temp);
        var color = severityColors[severity];
        fill(color.R, color.G, color.B);
        rect(0, 0, 1400, 100);
        rect(0, 650, 1400, 100);

        fill('rgba(0,0,0,0.7)');
        rect(0, 100, 1400, 550);
}



	drawText1()
	drawText2()
	drawText3()
    drawText4()

	textSize(20);
   // background(255)
    fill(0);
    noStroke();
    if (weatherData){
       // ellipse(200,200, temperature * 10, temperature * 10);
       // ellipse(400,200, humidity, humidity);      

        drawPie(250, 440, 230, 230, humidity, 100, {'R': 0, 'G': 0, 'B': 0});

        drawPie(500, 440, 230, 230, speed, 100, {'R': 0, 'G': 0, 'B': 0});

        drawPie(750, 440, 230, 230, windDeg, 360, {'R': 0, 'G': 0, 'B': 0});

        drawPie(1000, 440, 230, 230, clouds, 360, {'R': 0, 'G': 0, 'B': 0});

        fill(255)
        text(humidity , 235, 455);
        text(speed, 485, 455);
        text(windDeg + "\xB0", 710, 455);
        text(clouds, 990, 455);
        

        if (icon != null) {
        	icon.remove();
       	 }
        icon = createImg("http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png");
       // icon.position(800, 200);

        image(icon, 985, 140, icon.width*2.5, icon.height*2.5);


           // loadImage(iconURL, function(img) {
          //  image(img, 0, 0);
        // });
        
    }
    
}

