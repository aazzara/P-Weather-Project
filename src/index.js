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
  let high = Math.round(value.data.main.temp_max);
  let newHigh = document.querySelector(".current-high");
  newHigh.innerHTML = high;
}

function logInput(result) {
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
}

function updateLocation(current) {
  let currentCity = current.data.name;
  let city = document.querySelector(".location");
  city.innerHTML = currentCity;
  let temperature = Math.round(current.data.main.temp);
  let newTemp = document.querySelector(".current-temp");
  newTemp.innerHTML = temperature;
  let high = Math.round(current.data.main.temp_max);
  let newHigh = document.querySelector(".current-high");
  newHigh.innerHTML = high;
}

function displayCurrent(current) {
  let apiKey = `e57aed5a3752290f9e3c0dd1d0ad914d`;
  let latitude = current.coords.latitude;
  let longitude = current.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(updateLocation);
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(displayCurrent);
}

let input = document.querySelector(".search-form");
input.addEventListener("submit", logInput);

let current = document.querySelector(".btn-info");
current.addEventListener("click", getLocation);
