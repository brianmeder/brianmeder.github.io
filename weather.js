//Tutorial Used: https://www.youtube.com/watch?v=n4dtwWgRueI&t=1260s&ab_channel=TylerPotts

const key = "0488057093df3cf19f228976c57e635d";
const web = "https://api.openweathermap.org/data/2.5/";

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress', setQuery);


function setQuery(event) {
  if (event.keyCode == 13) {
    getResults(searchbox.value);
  }
}

function getResults (query) {

  //Longitude and Latitude used by OpenWeather API for more accurate results

  var latitude = document.getElementById('cityLat').value
  var longitude = document.getElementById('cityLng').value

  //Debug console logs
  //console.log(query);
  //console.log (latitude);
  //console.log(longitude);

  fetch(`${web}weather?lat=${latitude}&lon=${longitude}&units=imperial&APPID=${key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {

  //Location
  let city = document.querySelector('.main-data .city');
  city.innerText = `${searchbox.value}`;

  //Today's date
  let now = new Date();
  let date = document.querySelector('.main-data .date');
  date.innerText = dateBuilder(now);

  //Current temperature
  let temp = document.querySelector('.enviro .temp');
  temp.innerHTML = `Current Temperature: ${weather.main.temp}<span>°F</span>`;

  //Weather conditions
  let weather_el = document.querySelector('.enviro .weather');
  let iconcode = weather.weather[0].icon;
  let iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png";
  document.getElementById("wicon").src = iconurl;

  weather_el.innerText = `Current Weather: ${weather.weather[0].main}`;

  //Today's high and low
  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `Today's Low: ${weather.main.temp_min}°F | Today's High: ${weather.main.temp_max}°F`;


  //JavaScript's built in date.toLocaleTimeString function allows for
  //inline CSS to remove seconds from the time via "{timeStyle: 'short'}""
  //Used for displaying sunrise and sunset

  //Sunrise
  var properSunrise = weather.sys.sunrise;
  properSunrise = properSunrise * 1000; //Convert from miliseconds
  properSunrise = new Date(properSunrise).toLocaleTimeString("en-US", {timeStyle: 'short'});
  let sunrise = document.querySelector('.cool-facts .sunrise');
  sunrise.innerHTML = "Sun Rise (User local time): " + properSunrise;

  //Sunset
  var properSunset = weather.sys.sunset;
  properSunset = properSunset * 1000; //Convert from miliseconds
  properSunset = new Date(properSunset).toLocaleTimeString("en-US", {timeStyle: 'short'});
  let sunset = document.querySelector('.cool-facts .sunset');
  sunset.innerHTML = "Sun Set (User local time): " + properSunset;

  //Greeting
  let goodbye = document.querySelector('.goodbye')
  var goodbyeTime = new Date();
  const hours = goodbyeTime.getHours();
  if (hours > 6 && hours < 20) { goodbye.innerHTML = "Have a great day!"; }
    else {
      goodbye.innerHTML = "Have a great night!";
    }
}

function dateBuilder (d) {
  let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[d.getDay()];
  let month = months[d.getMonth()];
  let date = d.getDate();
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
