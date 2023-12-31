const apiKey = "5a88e08cce3e558079d9ecb056444a39";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

function getWeatherIcon(weatherMain) {
  switch (weatherMain) {
    case "Clouds":
      return "images/clouds.png";
    case "Clear":
      return "images/clear.png";
    case "Rain":
      return "images/rain.png";
    case "Drizzle":
      return "images/drizzle.png";
    case "Mist":
      return "images/mist.png";
    default:
      return null;
  }
}

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    handleError();
  } else {
    const data = await response.json();
    displayWeather(data);
  }
}

function handleError() {
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
}

function displayWeather(data) {
  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
  document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
  document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
  weatherIcon.src = getWeatherIcon(data.weather[0].main);

  document.querySelector(".weather").style.display = "block";
  document.querySelector(".error").style.display = "none";
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});
