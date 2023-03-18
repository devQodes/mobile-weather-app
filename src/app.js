let currentDayTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let day = days[currentDayTime.getDay()];
let time = currentDayTime.toLocaleTimeString().substring(0, 5);
let currentDay = document.querySelector(".day");
let currentTime = document.querySelector(".time");

currentDay.innerHTML = `${day}`;
currentTime.innerHTML = `${time}`;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayCurrentLocationTemp(response) {
  let currentLocation = response.data.name;
  let currentWeather = response.data.weather[0].description;
  let currentWeatherIcon = response.data.weather[0].icon;
  let currentAlt = response.data.weather[0].description;
  let currentWindSpeed = response.data.wind.speed;
  let currentHumidity = response.data.main.humidity;
  let currentCelsius = Math.round(response.data.main.temp);
  let currentUnformattedCelsius = response.data.main.temp;

  let location = document.querySelector(".city");
  let weatherDescription = document.querySelector(".description");
  let weatherIcon = document.querySelector(".icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${currentWeatherIcon}@2x.png`
  );
  weatherIcon.setAttribute("alt", currentAlt);
  let windSpeed = document.querySelector(".windspeed-value");
  let humidity = document.querySelector(".humidity-value");
  let temp = document.querySelector(".temp");

  location.innerHTML = `${currentLocation}`;
  weatherDescription.innerHTML = `${currentWeather}`;
  // weatherIcon.innerHTML;
  windSpeed.innerHTML = `${currentWindSpeed} km/h`;
  humidity.innerHTML = `${currentHumidity}%`;
  temp.innerHTML = `${currentCelsius}°C`;
  console.log(response);

  getForecast(response.data.coord);
}

function retrievePosition(geolocationposition) {
  let lon = geolocationposition.coords.longitude;
  let lat = geolocationposition.coords.latitude;
  let apiEndPoint = `https://api.openweathermap.org/data/2.5/weather?`;
  let apiKey = `0829bfb409471205ac9c814cc7689b1c`;
  let unit = `metric`;

  let apiUrl = `${apiEndPoint}lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayCurrentLocationTemp);
}

navigator.geolocation.getCurrentPosition(retrievePosition);

function displayCity(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city =
    cityInput.value.charAt(0).toUpperCase() + cityInput.value.substring(1);
  let cityDisplay = document.querySelector(".city");

  cityDisplay.innerHTML = `${city}`;

  let unit = "metric";
  let apiEndPoint = `https://api.shecodes.io/weather/v1/current?`;
  let apiKey = `7ab4d37ad9of0d5ed95dbe4t3852c598`;
  let apiUrl = `${apiEndPoint}query=${city}&key=${apiKey}&units=${unit}`;

  function displayWeather(response) {
    let weatherData = response.data.condition.description;
    let iconData = response.data.condition.icon_url;
    let altData = response.data.condition.icon;
    let windSpeedData = response.data.wind.speed;
    let humidityData = response.data.temperature.humidity;
    let celsiusData = Math.round(response.data.temperature.current);
    let celsiusUnformattedData = response.data.temperature.current;

    let weatherDescription = document.querySelector(".description");
    let icon = document.querySelector(".icon");
    icon.setAttribute("src", iconData);
    icon.setAttribute("alt", altData);
    // icon.innerHTML;
    let windSpeed = document.querySelector(".windspeed-value");
    let humidity = document.querySelector(".humidity-value");
    let temp = document.querySelector(".temp");

    weatherDescription.innerHTML = `${weatherData}`;
    windSpeed.innerHTML = `${windSpeedData} km/h`;
    humidity.innerHTML = `${humidityData}%`;
    temp.innerHTML = `${celsiusData}°C`;
  }

  axios.get(apiUrl).then(displayWeather);
}

let searchBar = document.querySelector(".search-bar");
searchBar.addEventListener("submit", displayCity);
