// 📆 Display date and time

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();

let months = [
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
let month = months[now.getMonth()];

let year = now.getFullYear();

let hour = now.getHours();
let minutes = now.getMinutes();

let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${day}, ${date} ${month} ${year} ${hour}:${minutes}`;

// 🏙 Display city name

function searchCity(event) {
  event.preventDefault();

  let city = document.querySelector("#city-search-input");
  city = city.value;

  let cityDisplay = document.querySelector("#city");
  cityDisplay.innerHTML = `${city}`;
}

let search = document.querySelector("form");
search.addEventListener("submit", searchCity);

// 🙀Bonus Feature
// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

// Switch between celsius and fahrenheit
// Going to do this when I decide how I would like the layout to accommodate it

function switchDegrees() {
  let switchButton = document.querySelector("#switch");
  let buttonContent = switchButton.innerHTML;

  let celsius = buttonContent.includes("celsius");
  if (celsius === true) {
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to farenheit`;
  } else {
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to celsius`;
  }

  // change aaaallllllll the degrees
}

let switchButton = document.querySelector("#switch");
switchButton.addEventListener("click", switchDegrees);
