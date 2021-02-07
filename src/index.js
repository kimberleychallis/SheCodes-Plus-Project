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

document.querySelector(
  "#date-time"
).innerHTML = `${day}, ${date} ${month} ${year} ${hour}:${minutes}`;

// 🌞 OPEN WEATHER API

//// ⛅️ Open Weather Map API Details

const apiKey = "3e11ec91583e0c90e17fc5eef84e88aa";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

//// 🏙 API call using user input

function handleSubmit(event) {
  event.preventDefault();
  const city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

function searchCity(city) {
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
  // set app back to celsius or else conversion calculations go a bit mental

  document.querySelector(
    "#switch"
  ).innerHTML = `<i class="fas fa-sync-alt"></i> switch to farenheit`;

  // display data from API

  const temperature = Math.round(response.data.main.temp);
  const cityName = response.data.name;

  document.querySelector("#city").innerHTML = `${cityName}`;
  document.querySelector("#current-temperature").innerHTML = `${temperature}°`;
}

const search = document.querySelector("form");
search.addEventListener("submit", handleSubmit);

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
    const tempFahrenheit = parseInt(tempFahrenheitString.innerHTML);
    const tempCelsius = Math.round(convertToCelsius(tempFahrenheit));

    document.querySelector(
      "#current-temperature"
    ).innerHTML = `${tempCelsius}°`;
  } else {
    // toggles 'button'
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to celsius`;

    // switches temperatures to fahrenheit

    const tempCelsiusString = document.querySelector("#current-temperature");
    const tempCelsius = parseInt(tempCelsiusString.innerHTML);
    const tempFahrenheit = Math.round(convertToFahrenheit(tempCelsius));

    document.querySelector(
      "#current-temperature"
    ).innerHTML = `${tempFahrenheit}°`;
  }
}

function convertToCelsius(fahrenheit) {
  return ((fahrenheit - 32) * 5) / 9;
}

function convertToFahrenheit(celsius) {
  return (celsius * 9) / 5 + 32;
}

const switchButton = document.querySelector("#switch");
switchButton.addEventListener("click", convertTemp);

// 🇬🇧 SET DEFAULT CITY TO LONDON, BEST CITY ON EARTH

searchCity("London");
