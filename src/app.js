let now = new Date();
//Hour:Minutes
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

//Day
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
  document.querySelector("#currentCity").innerHTML = response.data.name;

  let weatherIcon = document.querySelector("#forecastIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;

  let temperature = Math.round(response.data.main.temp);
  let cityTemp = document.querySelector("#currentTemp");
  cityTemp.innerHTML = `${temperature}°`;

  document.querySelector("#currentForecast").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
}

let celsiusTemp = null;

function showCelsius() {
  let temperature = document.querySelector("#currentTemp");
  temperature.innerHTML = `${Math.round(celsiusTemp)}°`;
}
let celsiusButton = document.querySelector("#celsius");
celsiusButton.addEventListener("click", showCelsius);

function showFahrenheit() {
  let temperature = document.querySelector("#currentTemp");
  let convertMetrics = (celsiusTemp * 9) / 5 + 32;
  temperature.innerHTML = `${Math.round(convertMetrics)}°`;
}

let fahrenheitButton = document.querySelector("#fahrenheit");
fahrenheitButton.addEventListener("click", showFahrenheit);

function searchCity(city) {
  let apiKey = "a5ba4e73c230d5f2cd06859c666eca1b";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function searchWeather(event) {
  event.preventDefault();

  let city = document.querySelector("#cityInput").value;
  searchCity(city);
}
let button = document.querySelector("#searchForm");
button.addEventListener("submit", searchWeather);

searchCity("Limassol");

function showLocation(position) {
  let apiKey = "a5ba4e73c230d5f2cd06859c666eca1b";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(url).then(showTemp);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let currentLocationButton = document.querySelector("#currentLocation");
currentLocationButton.addEventListener("click", searchCurrentLocation);
