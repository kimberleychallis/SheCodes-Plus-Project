// ⛅️ Open Weather Map API Details

const apiKey = "3e11ec91583e0c90e17fc5eef84e88aa";
const apiURL = "https://api.openweathermap.org/data/2.5/weather?";

// 📆 Display date and time

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

// 🏙 Display city name

function searchCity(event) {
  event.preventDefault();

  const cityInput = document.querySelector("#city-search-input");
  const city = cityInput.value;

  const cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = `${city}`;
}

const search = document.querySelector("form");
search.addEventListener("submit", searchCity);

// 🌡 Switch between celsius and fahrenheit

function convertTemp() {
  const switchButton = document.querySelector("#switch");
  const buttonContent = switchButton.innerHTML;

  const celsius = buttonContent.includes("celsius");
  if (celsius === true) {
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to farenheit`;
  } else {
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to celsius`;
  }
}

const switchButton = document.querySelector("#switch");
switchButton.addEventListener("click", convertTemp);
