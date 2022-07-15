// https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// Your API key is 46aa886cbc817eec006f6d044987e3b0

// WHEN I view current weather conditions for that city
// https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
// https://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}



// // var testUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`

// Retrieves submit button from document and sets a click event to run getCity function
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', getCity);

function getCity(event) {
    event.preventDefault();

    // Gets the value of what's in the searchInput; sets it's name to city 
    let city = document.getElementById('searchInput').value;

    // Stores city in local storage 
    localStorage.setItem('city', city);

    // Retrieves element with #cities from doc
    let CitiesEl = document.getElementById('Cities')

    // Creates button
    let previousCityBtn = document.createElement('button');
   
    // Grabs city from local storage and sets the text of the button to the city
    localStorage.getItem(city);
    previousCityBtn.textContent = city;

    // Adds classes/style to button
    previousCityBtn.classList.add('col-12');
    previousCityBtn.classList.add('mt-3');

    // Appends the button to the page
    CitiesEl.appendChild(previousCityBtn);

    // Retrieves element with #results from doc
    let resultsEl = document.getElementById('results');

    // Creates an h1 element and sets text content to city
    let resultsTitle = document.createElement('h1');
    resultsTitle.textContent = city;

    // Appends the city title to the page
    resultsEl.appendChild(resultsTitle);

    getLatLon($('#searchInput').val());
}

function getLatLon(e){
    let lat;
    let lon;
    console.log(e)
    let geoAPIurl= `http://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=46aa886cbc817eec006f6d044987e3b0`

    fetch(geoAPIurl)
    .then(function(response){
    return response.json();
    }).then(function(data){
        console.log(data);
        console.log("lat",data[0].lat);
        console.log("lon",data[0].lon);
        lat = data[0].lat;
        lon = data[0].lon;
        currentForecast(lat, lon);
    })
};


function currentForecast(Lat, Lon) {   
    let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${Lat}&lon=${Lon}&appid=46aa886cbc817eec006f6d044987e3b0`
    fetch(weatherAPIUrl)
    .then(function(response){
    return response.json();
    }).then(function(data){
    console.log(data);
   // APPEND TO PAGE   
    })
 }