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

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastDays = document.querySelector("#forecastDays");
  let forecastDaysHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastDaysHTML =
        forecastDaysHTML +
        `<h3 class="dayOne">${formatDay(forecastDay.dt)}</h3><br/>`;
    }
  });
  forecastDaysHTML = forecastDaysHTML + `</div>`;
  forecastDays.innerHTML = forecastDaysHTML;

  let forecastIcons = document.querySelector("#forecastDaysIcons");
  let forecastIconsHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastIconsHTML =
        forecastIconsHTML +
        `<img
          src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"/width="60"/><br/>`;
    }
  });
  forecastIconsHTML = forecastIconsHTML + ``;
  forecastIcons.innerHTML = forecastIconsHTML;

  /*let fahrenheit = document.querySelector("#fahrenheit");
  let celsius = document.querySelector("#celsius");

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
*/
  let forecastTemp = document.querySelector("#forecastDaysTemp");
  let forecastTempHTML = ``;
  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastTempHTML =
        forecastTempHTML +
        `<h3 class="dayOne"><span class="tempMax">${Math.round(
          forecastDay.temp.max
        )}°</span>/<span class="tempMin">${Math.round(
          forecastDay.temp.min
        )}°</span></h3><br/>`;
    }
  });
  forecastTempHTML = forecastTempHTML + ``;
  forecastTemp.innerHTML = forecastTempHTML;
}

function getForecast(coordinates) {
  let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(displayForecast);
}

function showTemp(response) {
  let weatherIcon = document.querySelector("#forecastIcon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", response.data.weather[0].description);

  celsiusTemp = response.data.main.temp;
  convertMetrics();

  document.querySelector("#currentCity").innerHTML = response.data.name;
  document.querySelector("#weatherDescription").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#windSpeed").innerHTML = Math.round(
    response.data.wind.speed
  );
  getForecast(response.data.coord);
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
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
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
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=${units}`;
  axios.get(url).then(showCurrentCity);
}

function searchCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

let apiKey = "a5ba4e73c230d5f2cd06859c666eca1b";
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
