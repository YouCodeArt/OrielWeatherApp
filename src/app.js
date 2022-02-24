let now = new Date();

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let currentTime = document.querySelector("#currentTime");
currentTime.innerHTML = `${hours}:${minutes}`;

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];
let currentDay = document.querySelector("#currentDay");
currentDay.innerHTML = today;

function showTemp(response) {
  let weatherIcon = document.querySelector("#forecastIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
  convertMetrics();
  /* 
  let cityInput = document.querySelector("#cityInput");
  cityInput.setAttribute("placeholder", response.data.name);
*/
  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
}

function convertMetrics() {
  let fahrenheit = document.querySelector("#fahrenheit");
  let celsius = document.querySelector("#celsius");
  let temp = document.querySelector("#currentTemp");
  if (fahrenheit.checked) {
    temp.innerHTML = `${Math.round((celsiusTemp * 9) / 5 + 32)}°`;
    fahrenheit.checked = true;
    celsius.checked = false;
  } else {
    temp.innerHTML = `${Math.round(celsiusTemp)}°`;
    celsius.checked = true;
    fahrenheit.checked = false;
  }
}

function showCelsius() {
  convertMetrics();
}

function showFahrenheit() {
  convertMetrics();
}

function searchCity(city) {
  let apiKey = "a5ba4e73c230d5f2cd06859c666eca1b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units} `;
  axios.get(url).then(showTemp);
}

function searchWeather(event) {
  event.preventDefault();
  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}

function showCurrentCity(response) {
  let currentCity = document.querySelector("#cityInput");
  currentCity.setAttribute("placeholder", response.data.name);
  showTemp(response);
}

function showLocation(position) {
  let apiKey = "a5ba4e73c230d5f2cd06859c666eca1b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showCurrentCity);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let units = "metric";
let celsiusTemp = null;

let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheit);

let button = document.querySelector("#searchForm");
button.addEventListener("submit", searchWeather);

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", searchCurrentLocation);

searchCity("Limassol");
