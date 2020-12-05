let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let hour = now.getHours();
let minute = now.getMinutes();
if (minute < 10) minute = "0" + minute;

let currentTime = document.querySelector(".current-time");
currentTime.innerHTML = `${day} ${hour}:${minute}`;

function updateValues(value) {
  event.preventDefault();
  let temperature = Math.round(value.data.main.temp);
  let newTemp = document.querySelector(".current-temp");
  newTemp.innerHTML = temperature;
  fahrenheitTemperature = temperature;
  let high = Math.round(value.data.main.temp_max);
  let newHigh = document.querySelector(".current-high");
  newHigh.innerHTML = high;
  let humidity = value.data.main.humidity;
  let newHumidity = document.querySelector(".current-humidity");
  newHumidity.innerHTML = humidity;
  let wind = Math.round(value.data.wind.speed);
  let newWind = document.querySelector(".current-wind");
  newWind.innerHTML = wind;
  let icon = `http://openweathermap.org/img/wn/${value.data.weather[0].icon}@2x.png`;
  let image = document.querySelector(".icon");
  image.setAttribute("src", icon)
  let condition = value.data.weather[0].main;
  let newCondition = document.querySelector(".condition");
  newCondition.innerHTML = condition;
}

function updateForecast(value) {
    let date = new Date(value.data.list[0].dt*1000);
    day = days[date.getDay()];
    hour = date.getHours();
    minute = date.getMinutes();
    if (minute < 10) minute = "0" + minute;
    let time = `${day.substring(0,3)} ${hour}:${minute}`;
    let rangeOne = document.querySelector(".rangeOne");
    rangeOne.innerHTML = time;
    let iconOne = document.querySelector(".iconOne");
    icon = `http://openweathermap.org/img/wn/${value.data.list[0].weather[0].icon}@2x.png`
    iconOne.setAttribute("src", icon);
    temperature = Math.round(value.data.list[0].main.temp);
    let tempOne = document.querySelector(".tempOne");
    tempOne.innerHTML = temperature;
  
}

function searchInput(result) {
  event.preventDefault();
  let changeCity = document.querySelector("#changeCity");
  let city = document.querySelector(".location");
  city.innerHTML = changeCity.value;
  let newCity = changeCity.value;
  let units = "imperial";
  let apiKey = `e57aed5a3752290f9e3c0dd1d0ad914d`;
  let apiEndpoint = `https://api.openweathermap.org/data/2.5/weather?q=`;
  let apiUrl = `${apiEndpoint}${newCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateValues);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${newCity}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateForecast);

}

function updateLocation(current) {
  let currentCity = current.data.name;
  let city = document.querySelector(".location");
  city.innerHTML = currentCity;
  updateValues(current);
}

function searchCurrent(current) {
  let apiKey = `e57aed5a3752290f9e3c0dd1d0ad914d`;
  let latitude = current.coords.latitude;
  let longitude = current.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateLocation);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
  axios.get(apiUrl).then(updateForecast);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(searchCurrent);
}

function convertToCelsius(temperature) {
let temperatureValue = document.querySelector(".current-temp");
temperatureValue.innerHTML = Math.round((fahrenheitTemperature-32)*5/9);
fahrenheit.removeAttribute("class", "active");
fahrenheit.setAttribute("class", "inactive");
celsius.removeAttribute("class", "inactive");
celsius.setAttribute("class", "active");
}

function convertToFahrenheit(temperature) {
  event.preventDefault();
  let temperatureValue = document.querySelector(".current-temp");
  temperatureValue.innerHTML = fahrenheitTemperature;
  fahrenheit.removeAttribute("class", "inactive");
  fahrenheit.setAttribute("class", "active");
  celsius.removeAttribute("class", "active");
  celsius.setAttribute("class", "inactive");

}

let input = document.querySelector(".search-form");
input.addEventListener("submit", searchInput);

let current = document.querySelector(".btn-info");
current.addEventListener("click", getLocation);

let fahrenheitTemperature = null;

let celsius = document.querySelector(".celsius");
celsius.addEventListener("click", convertToCelsius);

let fahrenheit = document.querySelector(".fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);