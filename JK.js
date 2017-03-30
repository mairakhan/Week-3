// ***** Global variables ***** //
var apiKey = '1934a3cfafeecec67d0d0f3d1f2c6e3c';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units = 'metric';
var weatherData;
var temperature = 0;
var humidity = 0;
var button;
var icon;

//Severity levels
var SEVERITY_FREEZING = 0;
var SEVERITY_COLD = 1;
var SEVERITY_WARM = 2;
var SEVERITY_HOT = 3;

var severityColors = {};
severityColors[SEVERITY_FREEZING] = {'R': 255, 'G': 255, 'B': 50};
severityColors[SEVERITY_COLD] = {'R': 255, 'G': 255, 'B': 150};
severityColors[SEVERITY_WARM] = {'R': 150, 'G': 255, 'B': 150};
severityColors[SEVERITY_HOT] = {'R': 50, 'G': 255, 'B': 150};

// ***** Setup function ***** //
function setup() {
    createCanvas(1400, 1200);
    button = select("#submit");
    city = select("#city");
    button.mousePressed(queryAPI);
    noLoop();
}

function queryAPI(){
    var query = baseURL + city.value() +'&apiKey=' + apiKey + '&units=' + units;
    loadJSON(query, getWeatherData);
    //console.log('here we querried/ called the api and added the data to getWeatherData');
}

function getWeatherData(apiData){
    weatherData = apiData; 
    
    temperature = weatherData.main.temp;
    humidity = weatherData.main.humidity;

    //console.log(weatherData);
    redraw();
}

var c = 100;

var a = 'abc';

var obj = {'red': 123, 'green': 765};
obj.red[1]
//console.log(obj.red);

// ***** Draw function ***** //
function draw() {
    drawGrid();
    
    if (weatherData) {
        var severity = getSeverity(weatherData.main.temp);
        var color = severityColors[severity];

        fill(color.R, color.G, color.B);
        rect(100, 100, 400, 50);

        ellipse(200, 200, temperature * 10, temperature * 10);
        text(humidity, 10, 30);

        drawPie(500, 300, 100, 100, humidity, 100, {'R': 0, 'G': 255, 'B': 255});

        if (icon != null) {
            icon.remove();
        }
        icon = createImg("http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png");
        icon.position(300, 300);
    }
}

function drawGrid() {
    stroke(200, 200, 200);
    fill(255, 255, 255);

    for (var i = 0; i < 28; i++) {
        for (var j = 0; j < 28; j++) {
            rect(i * 50, j * 50, 50, 50); //Square's x position, y position, width, and height
        }
    }
}

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

function drawPie(x, y, width, height, value, maxValue, color) {
    noStroke();

    fill('rgba(' + color.R + ', ' + color.G + ', ' + color.B + ', 0.17)');
    ellipse(x, y, width, height);
    
    fill(color.R, color.G, color.B);
    arc(x, y, width, height, -HALF_PI, -HALF_PI + (value/maxValue * 2*PI), PIE);
    
    fill(255);
    ellipse(x, y, width - 10, height - 10);
}