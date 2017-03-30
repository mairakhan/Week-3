// ***** Global variables ***** //
var apiKey = '1934a3cfafeecec67d0d0f3d1f2c6e3c';
var baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city;
var units = 'metric';
var weatherData;
var temperature = 0;
var humidity = 0;
var iconURL;
var button;


// ***** Setup function ***** //
function setup(){
createCanvas(800,800);
button = select("#submit");
city = select("#city");
button.mousePressed(queryAPI)
}

function queryAPI(){
var query = baseURL + city.value() +'&apiKey=' + apiKey + '&units=' + units;
loadJSON(query,getWeatherData);
console.log('here we querried/ called the api and added the data to getWeatherData');
}

function getWeatherData(apiData){
weatherData = apiData; 
temperature = weatherData.main.temp;
humidity = weatherData.main.humidity;
iconURL = "http://openweathermap.org/img/w/" + weatherData.weather[0].icon + ".png";
console.log(weatherData);
}


// ***** Draw function ***** //
function draw(){
    background(255)
    fill(0);
    noStroke();
    if (weatherData){
        ellipse(200,200, temperature * 10, temperature * 10);
        loadImage(iconURL, function(img) {
            image(img, 0, 0);
        });
    }
    
}