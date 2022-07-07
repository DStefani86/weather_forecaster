var currentTime = moment().format("X");
var searchInput = document.getElementById("search-input");
var buttonInput = document.getElementById("search-button");
var todayForecast = document.getElementById("current-daycast");
var futureForecast = document.getElementById("future-daycast");
var citiesSearched = document.getElementById("search-history");

buttonInput.addEventListener("click", function (event) {
  event.preventDefault;
  var citySearch = searchInput.value;
  searchValue(citySearch);
  searchInput.value = "";
});
function searchValue(citySearch) {
  var APIkey = "ec4454c54b0c8e18793fbf66b902c62d";
  var geoLocation =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    citySearch +
    "&appid=" +
    APIkey;
  fetch(geoLocation)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var currentDayCast = document.createElement("div");
      todayForecast.textContent = "";
      var cityList = document.createElement("li");
      cityList.textContent = data[0].name;
      citiesSearched.appendChild(cityList);
      var currentCity = document.createElement("h4");
      currentCity.textContent = data[0].name;
      currentDayCast.appendChild(currentCity);
      console.log(data);
      var lattitude = data[0].lat;
      var longitude = data[0].lon;
      var oneCallAPI =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lattitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIkey +
        "&units=imperial";
      fetch(oneCallAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var temperature = document.createElement("p");
          var humidity = document.createElement("p");
          var wind = document.createElement("p");
          var UV = document.createElement("span");
          if (data.current.uvi < 2) {
            UV.classList.add("low");
          } else if (data.current.uvi >= 2 && data.current.uvi < 8) {
            UV.classList.add("med");
          } else {
            UV.classList.add("high");
          }
          temperature.textContent = "Temp:" + data.current.temp;
          humidity.textContent = "Hum:" + data.current.humidity;
          wind.textContent = "Wind:" + data.current.wind_speed;
          UV.textContent = data.current.uvi;
          var UVspan = document.createElement("p");
          UVspan.textContent = "uvindex";
          UVspan.appendChild(UV);
          currentDayCast.appendChild(temperature);
          currentDayCast.appendChild(humidity);
          currentDayCast.appendChild(wind);
          currentDayCast.appendChild(UVspan);
          todayForecast.appendChild(currentDayCast);
          futureForecast.innerHTML = "";
          for (i = 1; i < 6; i++) {
            var dailyContainer = document.createElement("div");
            dailyContainer.classList.add("card");
            var dayContainer = document.createElement("div");
            dayContainer.classList.add("card-body");
            var dayHead = document.createElement("h4");
            dayHead.classList.add("mb-1", "sfw-normal");
            var dayTemp = document.createElement("p");
            var dayHumidity = document.createElement("p");
            var dayWind = document.createElement("p");
            var dayImg = document.createElement("img");
            dayImg.setAttribute(
              "src",
              "https://openweathermap.org/img/w/" +
                data.daily[i].weather[0].icon +
                ".png"
            );
            var currentUni = new Date(data.daily[i].dt * 1000);
            var normalTime = currentUni.toLocaleString();
            dayTemp.textContent = "Temp:" + data.daily[i].temp.max;
            dayHumidity.textContent = "Hum:" + data.daily[i].humidity;
            dayWind.textContent = "Wind:" + data.daily[i].wind_speed;
            dayHead.textContent = normalTime;
            dayContainer.appendChild(dayHead);
            dayContainer.appendChild(dayTemp);
            dayContainer.appendChild(dayHumidity);
            dayContainer.appendChild(dayWind);
            futureForecast.appendChild(dayContainer);
            dayHead.classList.add("futureheader");
          }
        });
    });
}
