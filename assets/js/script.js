// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// Your API key is 46aa886cbc817eec006f6d044987e3b0

// WHEN I view current weather conditions for that city
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

var apiKey = '46aa886cbc817eec006f6d044987e3b0'
var userSearch = "Austin"
var weatherAPIUrl = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}`
var geoAPIurl=`http://api.openweathermap.org/geo/1.0/direct?q=${userSearch}&limit=5&appid=${apiKey}`
// var testUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`
// Value from search form
var lat;
var lon;
var submitBtn = document.getElementById('submitBtn');

// document.getElementById("#searchInput").value
function getLatLon(){

fetch(geoAPIurl)
.then(function(response){
return response.json();
}).then(function(data){
    console.log(data);
    console.log("lat",data[0].lat)
    console.log("lon",data[0].lon)
    lat = data[0].lat
    lon = data[0].lon
    currentForecast();
})
};

submitBtn.addEventListener('click', getLatLon);



// function currentForecast(){
// fetch(weatherAPIUrl)
// .then(function(response){
// return response.json();
// }).then(function(data){
//     console.log(data);
//     // APPEND TO PAGE   
// })
// };