// 📆 DISPLAY USER'S CURRENT DATE AND TIME

const now = new Date();

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const day = days[now.getDay()];

const date = now.getDate();

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const month = months[now.getMonth()];

const year = now.getFullYear();

const hour = now.getHours();
const minutes = now.getMinutes();

const dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day}, ${date} ${month} ${year} ${hour}:${minutes}`;

// 🌞 OPEN WEATHER API

//// ⛅️ Open Weather Map API Details

const apiKey = "3e11ec91583e0c90e17fc5eef84e88aa";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

//// 🏙 API call using user input

function searchCity(event) {
  event.preventDefault();

  const cityInput = document.querySelector("#city-search-input");
  const city = cityInput.value;
  const apiSearchString = `${apiURL}q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiSearchString).then(displayWeather);
}

//// 🗺 Obtain current location and API call using geolocation

function geolocateUser(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(obtainWeather);
}

function obtainWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coords = `lat=${lat}&lon=${lon}`;
  const apiSearchString = `${apiURL}${coords}&appid=${apiKey}&units=metric`;

  axios.get(apiSearchString).then(displayWeather);
}

const geolocateButton = document.querySelector("#geolocate");
geolocateButton.addEventListener("click", geolocateUser);

//// 🏙 Display city name and current temperature (input or geolocation)

function displayWeather(response) {
  const temperature = Math.round(response.data.main.temp);
  const cityName = response.data.name;

  const cityNameDisplay = document.querySelector("#city");
  cityNameDisplay.innerHTML = `${cityName}`;

  const nowTemperature = document.querySelector("#current-temperature");
  nowTemperature.innerHTML = `${temperature}°`;
}

const search = document.querySelector("form");
search.addEventListener("submit", searchCity);

// 🌡 SWITCH BETWEEN CELSIUS AND FAHRENHEIT
// Will probably need to split these out into functions that do the conversion

function convertTemp() {
  const switchButton = document.querySelector("#switch");
  const buttonContent = switchButton.innerHTML;

  const celsius = buttonContent.includes("celsius");
  if (celsius === true) {
    // toggles 'button'
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to farenheit`;

    // switches temperatures to celsius

    const tempFahrenheitString = document.querySelector("#current-temperature");
    const tempFahrenheit = parseInt(tempFahrenheitString.innerText);
    const tempCelsius = Math.round(((tempFahrenheit - 32) * 5) / 9);

    const currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = `${tempCelsius}`;
  } else {
    // toggles 'button'
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to celsius`;

    // switches temperatures to fahrenheit

    const tempCelsiusString = document.querySelector("#current-temperature");
    const tempCelsius = parseInt(tempCelsiusString.innerText);
    const tempFahrenheit = Math.round((tempCelsius * 9) / 5 + 32);

    const currentTemperature = document.querySelector("#current-temperature");
    currentTemperature.innerHTML = `${tempFahrenheit}`;
  }
}

const switchButton = document.querySelector("#switch");
switchButton.addEventListener("click", convertTemp);
