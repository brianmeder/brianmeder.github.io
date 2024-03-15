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
  fetch(`${web}weather?q=${query}&units=imperial&APPID=${key}`)
    .then(weather => {
      return weather.json();
    }).then(displayResults);
}

function displayResults (weather) {
  let city = document.querySelector('.main-data .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector('.main-data .date');
  date.innerText = dateBuilder(now);

  let temp = document.querySelector('.enviro .temp');
  temp.innerHTML = `${weather.main.temp}<span>°F</span>`;

  let weather_el = document.querySelector('.enviro .weather');
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector('.hi-low');
  hilow.innerText = `${weather.main.temp_min}°F / ${weather.main.temp_max}°F`;

  var properSunrise = weather.sys.sunrise;
  properSunrise = properSunrise * 1000; //Convert from miliseconds
  properSunrise = new Date(properSunrise).toLocaleTimeString("en-US");
  let sunrise = document.querySelector('.cool-facts .sunrise');
  sunrise.innerHTML = "Sun Rise (User local time): " + properSunrise;

  var properSunset = weather.sys.sunset;
  properSunset = properSunset * 1000; //Convert from miliseconds
  properSunset = new Date(properSunset).toLocaleTimeString("en-US");
  let sunset = document.querySelector('.cool-facts .sunset');
  sunset.innerHTML = "Sun Set (User local time): " + properSunset;

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