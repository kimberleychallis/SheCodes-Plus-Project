// DISPLAYS DATE AND TIME AT WEATHER LOCATION

function showLocalDateTime(timestamp) {
  const localDateTime = new Date(timestamp);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[localDateTime.getDay()];

  const date = localDateTime.getDate();

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
  const month = months[localDateTime.getMonth()];

  const year = localDateTime.getFullYear();

  const hour = localDateTime.getHours();

  let minutes = localDateTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  document.querySelector(
    "#date-time"
  ).innerHTML = `${day}, ${date} ${month} ${year} ${hour}:${minutes}`;
}

// OPEN WEATHER API

//// Open Weather Map API Details

const apiKey = "3e11ec91583e0c90e17fc5eef84e88aa";
const apiURLCurrentWeather = "https://api.openweathermap.org/data/2.5/weather?";

//// API call using user input

function handleSubmit(event) {
  event.preventDefault();
  const city = document.querySelector("#city-search-input").value;
  searchCity(city);
}

function searchCity(city) {
  if (city == null) return;
  const apiSearchString = `${apiURLCurrentWeather}q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiSearchString).then(displayWeather);
}

//// Obtain current location and API call using geolocation

function geolocateUser(event) {
  event.preventDefault();

  navigator.geolocation.getCurrentPosition(obtainWeather);
}

function obtainWeather(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const coords = `lat=${lat}&lon=${lon}`;
  const apiSearchString = `${apiURLCurrentWeather}${coords}&appid=${apiKey}&units=metric`;

  axios.get(apiSearchString).then(displayWeather);
}

const geolocateButton = document.querySelector("#geolocate");
geolocateButton.addEventListener("click", geolocateUser);

//// Display city name and current temperature (input or geolocation)

function displayWeather(response) {
  // set app back to celsius or else conversion calculations go a bit mental

  document.querySelector(
    "#switch"
  ).innerHTML = `<i class="fas fa-sync-alt"></i> switch to fahrenheit`;

  // display date and time of location from API

  const dateTime = response.data.dt;
  const timezone = response.data.timezone;
  const localDateTimeFromAPI = (dateTime + timezone) * 1000;

  showLocalDateTime(localDateTimeFromAPI);

  // display current weather data from API

  const temperature = Math.round(response.data.main.temp);
  const cityName = response.data.name;
  const weatherDescription = response.data.weather[0].description;
  const feelsLike = Math.round(response.data.main.feels_like);
  const humidity = response.data.main.humidity;
  const wind = Math.round(response.data.wind.speed * 3.6);

  document.querySelector("#city").innerHTML = `${cityName}`;
  document.querySelector("#current-temperature").innerHTML = `${temperature}°`;
  document.querySelector(
    "#weather-description"
  ).innerHTML = `${weatherDescription}`;
  document.querySelector("#feels-like").innerHTML = `${feelsLike}°`;
  document.querySelector("#humidity").innerHTML = `${humidity}`;
  document.querySelector("#wind").innerHTML = `${wind}km/hr`;

  // display current weather icon and colours to reflect current weather

  function setCurrentWeatherIconAndColours(weatherID) {
    const weatherIcon = document.querySelector("#current-weather-icon");
    const app = document.querySelector(".app");
    const cityName = document.querySelector("#city");
    const currentTemperature = document.querySelector("#current-temperature");

    if (weatherID >= 200 && weatherID < 300) {
      // thunderstorms
      weatherIcon.innerHTML = `<i class="fas fa-bolt"></i>`;
      weatherIcon.style.color = "#321575";
      cityName.style.color = "#321575";
      currentTemperature.style.color = "#321575";
      app.style.backgroundImage =
        "linear-gradient(to right top, #321575 0%, #8D0B93 50%, #FF057C 100%)";
    } else if (weatherID >= 300 && weatherID < 500) {
      // drizzle
      weatherIcon.innerHTML = `<i class="fas fa-cloud-rain"></i>`;
      weatherIcon.style.color = "#8989ba";
      cityName.style.color = "#8989ba";
      currentTemperature.style.color = "#8989ba";
      app.style.backgroundImage =
        "linear-gradient(to right top, #8989ba 0%, #a7a6cb 100%)";
    } else if (weatherID >= 500 && weatherID < 600) {
      // rain
      weatherIcon.innerHTML = `<i class="fas fa-cloud-showers-heavy"></i>`;
      weatherIcon.style.color = "#325A8F";
      cityName.style.color = "#325A8F";
      currentTemperature.style.color = "#325A8F";
      app.style.backgroundImage =
        "linear-gradient(to right top, #330867 0%, #30cfd0 100%)";
    } else if (weatherID >= 600 && weatherID < 700) {
      // snow
      weatherIcon.innerHTML = `<i class="fas fa-snowflake"></i>`;
      weatherIcon.style.color = "#7ABBE0";
      cityName.style.color = "#7ABBE0";
      currentTemperature.style.color = "#7ABBE0";
      app.style.backgroundImage =
        "linear-gradient(to right top, #c8d7e0 0%, #d7e7f0 100%)";
    } else if (weatherID >= 700 && weatherID < 762) {
      // 'atmosphere'
      weatherIcon.innerHTML = `<i class="fas fa-smog"></i>`;
      weatherIcon.style.color = "#25405D";
      cityName.style.color = "#25405D";
      currentTemperature.style.color = "#25405D";
      app.style.backgroundImage =
        "linear-gradient(to right top, #09203f 0%, #537895 100%)";
    } else if (weatherID === 771 || weatherID === 781) {
      //windy af
      weatherIcon.innerHTML = `<i class="fas fa-wind"></i>`;
      weatherIcon.style.color = "#626266";
      cityName.style.color = "#626266";
      currentTemperature.style.color = "#626266";
      app.style.backgroundImage =
        "linear-gradient(to right top, #9D9EA3 0%, #BDBBBE 100%)";
    } else if (weatherID === 800) {
      // clear
      weatherIcon.innerHTML = `<i class="fas fa-sun"></i>`;
      weatherIcon.style.color = "#E36138";
      cityName.style.color = "#E36138";
      currentTemperature.style.color = "#E36138";
      app.style.backgroundImage =
        "linear-gradient(to right top, #fcab91 0%, #fee6c5 100%)";
    } else if (weatherID >= 801 && weatherID <= 803) {
      // light clouds
      weatherIcon.innerHTML = `<i class="fas fa-cloud-sun"></i>`;
      weatherIcon.style.color = "#7496CD";
      cityName.style.color = "#7496CD";
      currentTemperature.style.color = "#7496CD";
      app.style.backgroundImage =
        "linear-gradient(to right top, #bbcae2 0%, #dee9f6 100%)";
    } else if (weatherID === 804) {
      // cloudy
      weatherIcon.innerHTML = `<i class="fas fa-cloud"></i>`;
      weatherIcon.style.color = "#486FB6";
      cityName.style.color = "#486FB6";
      currentTemperature.style.color = "#486FB6";
      app.style.backgroundImage =
        "linear-gradient(to right top, #6a85b6 0%, #bac8e0 100%)";
    }
  }

  // setCurrentWeatherIconAndColours(200);
  // setCurrentWeatherIconAndColours(300);
  // setCurrentWeatherIconAndColours(500);
  // setCurrentWeatherIconAndColours(600);
  // setCurrentWeatherIconAndColours(700);
  // setCurrentWeatherIconAndColours(771);
  // setCurrentWeatherIconAndColours(800);
  // setCurrentWeatherIconAndColours(801);
  // setCurrentWeatherIconAndColours(804);
  setCurrentWeatherIconAndColours(response.data.weather[0].id);
}

const search = document.querySelector("form");
search.addEventListener("submit", handleSubmit);

// SWITCH BETWEEN CELSIUS AND FAHRENHEIT

function convertTemp() {
  const switchButton = document.querySelector("#switch");
  const buttonContent = switchButton.innerHTML;

  const celsius = buttonContent.includes("celsius");
  if (celsius === true) {
    // toggles 'button'
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to fahrenheit`;

    // switches temperatures to celsius

    // current temperature

    const currentTempFahrenheitString = document.querySelector(
      "#current-temperature"
    );
    const currentTempFahrenheit = parseInt(
      currentTempFahrenheitString.innerHTML
    );
    const currentTempCelsius = Math.round(
      convertToCelsius(currentTempFahrenheit)
    );

    document.querySelector(
      "#current-temperature"
    ).innerHTML = `${currentTempCelsius}°`;

    // feels like temperature

    const feelsLikeTempFahrenheitString = document.querySelector("#feels-like");
    const feelsLikeTempFahrenheit = parseInt(
      feelsLikeTempFahrenheitString.innerHTML
    );
    const feelsLikeTempCelsius = Math.round(
      convertToCelsius(feelsLikeTempFahrenheit)
    );

    document.querySelector(
      "#feels-like"
    ).innerHTML = `${feelsLikeTempCelsius}°`;
  } else {
    // toggles 'button'
    switchButton.innerHTML = `<i class="fas fa-sync-alt"></i> switch to celsius`;

    // switches temperatures to fahrenheit

    // current temperature

    const currentTempCelsiusString = document.querySelector(
      "#current-temperature"
    );
    const currentTempCelsius = parseInt(currentTempCelsiusString.innerHTML);
    const currentTempFahrenheit = Math.round(
      convertToFahrenheit(currentTempCelsius)
    );

    document.querySelector(
      "#current-temperature"
    ).innerHTML = `${currentTempFahrenheit}°`;

    // feels like temperature

    const feelsLikeTempCelsiusString = document.querySelector("#feels-like");
    const feelsLikeTempCelsius = parseInt(feelsLikeTempCelsiusString.innerHTML);
    const feelsLikeTempFahrenheit = Math.round(
      convertToFahrenheit(feelsLikeTempCelsius)
    );

    document.querySelector(
      "#feels-like"
    ).innerHTML = `${feelsLikeTempFahrenheit}°`;
  }
}

function convertToCelsius(fahrenheit) {
  if (fahrenheit == null) return;
  return ((fahrenheit - 32) * 5) / 9;
}

function convertToFahrenheit(celsius) {
  if (celsius == null) return;
  return (celsius * 9) / 5 + 32;
}

const switchButton = document.querySelector("#switch");
switchButton.addEventListener("click", convertTemp);

// SET DEFAULT CITY TO LONDON, BEST CITY ON EARTH

searchCity("London");
