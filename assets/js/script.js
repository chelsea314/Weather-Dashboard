// Retrieves submit button from document and sets a click event to run getCity function
let submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', getCity);

function getCity(event) {
    event.preventDefault();

    // Clears results and forecast section with each search
    $('#results').text('');
    $('#forecast').text('');

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
    previousCityBtn.setAttribute('class', 'previousCityBtn');

    // Adds classes/style to button
    previousCityBtn.classList.add('col-12');
    previousCityBtn.classList.add('mt-3');

    // Appends the button to the page
    CitiesEl.appendChild(previousCityBtn);

    // Run latLon function passing the value of the search input
    getLatLon($('#searchInput').val());
}



$(document).on('click', '.previousCityBtn', function searchAgain(e){
    $('#results').text('');
    $('#forecast').text('');
    var previousCityName = e.currentTarget.innerText
    getLatLon(previousCityName);
})





function getLatLon(e){

    // set lat and lon as variables
    let lat;
    let lon;

    // API to retrieve lat and lon of a city
    let geoAPIurl= `https://api.openweathermap.org/geo/1.0/direct?q=${e}&limit=1&appid=46aa886cbc817eec006f6d044987e3b0`

    // Calls to API
    fetch(geoAPIurl)
    .then(function(response){
    return response.json();

    // retrieves lat and lon from the data
    }).then(function(data){
        lat = data[0].lat;
        lon = data[0].lon;

    // Retrieves element with #results from doc
    let resultsEl = document.getElementById('results');

    // Creates an h1 element and sets text content to name index of data
    let resultsTitle = document.createElement('h1');
    resultsTitle.textContent = data[0].name;

    // Appends the city title to the page
    resultsEl.appendChild(resultsTitle);
    
    // Calls currentForecast function
    currentForecast(lat, lon);
    })
};

// Pulls current forecast from API
function currentForecast(Lat, Lon) {

    let weatherAPIUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${Lat}&lon=${Lon}&appid=46aa886cbc817eec006f6d044987e3b0`
    fetch(weatherAPIUrl)
    .then(function(response){
    return response.json();
    }).then(function(data){
    console.log(data);

    let date = new Date(data.current.dt*1000)
    let dateText = `${date.getMonth()}/${date.getDate()}/${date.getFullYear()}`

    let iconcode = data.current.weather[0].icon;
    let icon = $('<img>')
    icon.attr("src",`http://openweathermap.org/img/wn/${iconcode}@2x.png`);
    
    let kelvinTemp = data.current.temp;
    let celsiusTemp = kelvinTemp - 273;
    let fahrenTemp = Math.floor(celsiusTemp * (9/5) + 32);
    let humidity = data.current.humidity;
    let windSpeed = data.current.wind_speed;
    let uvIndex = data.current.uvi;
    
    var currentEl = document.createElement('div');
    var p1 = document.createElement('p');
    currentEl.appendChild(p1);
    p1.textContent = dateText 
    var p2 = document.createElement('p');
    currentEl.appendChild(p2);
    p2.textContent = 'Temp: ' + fahrenTemp + '°F';
    var p3 = document.createElement('p');
    currentEl.appendChild(p3);
    p3.textContent = 'Humidity: ' + humidity + '%'
    var p4 = document.createElement('p');
    currentEl.appendChild(p4);
    p4.textContent = 'Wind Speed: ' + windSpeed + 'mph'
    var p5 = document.createElement('p');
    currentEl.appendChild(p5);
    p5.textContent = 'UV Index: ' + uvIndex
    
    $('#results').append(icon);
    
    $('#results').append(currentEl);
    $('#results').attr('class', 'border');
    

    if (uvIndex <= 5) {
        p5.setAttribute('style', 'background-color: green')
    } else if (uvIndex >= 8) {
        p5.setAttribute('style', 'background-color: red')
    } else {
        p5.setAttribute('style', 'background-color: yellow')
    }


   let futureForecast = [ data.daily[1], data.daily[2], data.daily[3], data.daily[4], data.daily[5],];

   futureForecast.forEach(element =>{ 
    let nextDate = new Date(element.dt*1000);
    let nextDateText = `${nextDate.getMonth()}/${nextDate.getDate()}/${nextDate.getFullYear()}`;
    let nextIconCode = element.weather[0].icon;
    let nextKelvinTemp = element.temp.max;
    let nextCelsiusTemp = nextKelvinTemp - 273;
    let nextFahrenTemp = Math.floor(nextCelsiusTemp * (9/5) + 32);
    let nextWindSpeed = element.wind_speed;
    let nextHumidity = element.humidity;

    var futureEl = document.createElement('div');

    var p1next = document.createElement('p');
    futureEl.appendChild(p1next);
    p1next.textContent = nextDateText;

    var nextIconEl = document.createElement('img')
    futureEl.appendChild(nextIconEl)
    nextIconEl.setAttribute("src",`http://openweathermap.org/img/wn/${nextIconCode}@2x.png`)
   
    var p2next = document.createElement('p');
    futureEl.appendChild(p2next);
    p2next.textContent = 'Temp: ' + nextFahrenTemp + '°F';

    var p3next = document.createElement('p');
    futureEl.appendChild(p3next);
    p3next.textContent = 'Wind Speed: ' + nextWindSpeed + 'mph';

    var p4next = document.createElement('p');
    futureEl.appendChild(p4next);
    p4next.textContent = 'Humidity: ' + nextHumidity + '%';

    let fiveDayForecast = document.getElementById('forecast');

    fiveDayForecast.appendChild(futureEl);

    futureEl.setAttribute('class', 'forecast');
   })
})
}

