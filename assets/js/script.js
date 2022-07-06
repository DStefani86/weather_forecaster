var currentTime = moment().format("X");
var searchInput = document.getElementById("search-input");
console.log(searchInput);
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
  var APIkey = "d9bce79fe872e513ee7b58c79fd85200";
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
      todayForecast.textContent = "";
      var cityList = document.createElement("li");
      cityList.textContent = data[0].name;
      citiesSearched.appendChild(cityList);
      var currentCity = document.createElement("h4");
      currentCity.textContent = data[0].name;
      todayForecast.appendChild(currentCity);
      console.log(data);
      var lattitude = data[0].lat;
      var longitude = data[0].lon;
      var oneCallAPI =
        "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=" +
        lattitude +
        "&lon=" +
        longitude +
        "&appid=" +
        APIkey +
        "&dt=" +
        currentTime +
        "&units=imperial";
      fetch(oneCallAPI)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          var currentDayCast = document.createElement("div");
          var temperature = document.createElement("p");
          var humidity = document.createElement("p");
          var wind = document.createElement("p");
          var UV = document.createElement("span");
          temperature.textContent = data.current.temp;
          humidity.textContent = data.current.humidity;
          wind.textContent = data.current.wind_speed;
          UV.textContent = data.current.uvi;
          var UVspan = document.createElement("p");
          UVspan.textContent = "uvindex";
          UVspan.appendChild(UV);
          todayForecast.appendChild(temperature);
          todayForecast.appendChild(humidity);
          todayForecast.appendChild(wind);
          todayForecast.appendChild(UVspan);
        });
    });
}

// {
//   /* <div class="card shadow-0 border">
//               <div class="card-body p-4">
//                 <h4 class="mb-1 sfw-normal">City:</h4>
//                 <p class="mb-2">Current temperature: <strong>3.644</strong></p>
//                 <p>Feels like: <strong>4.37°C</strong></p>
//                 <p>Max: <strong>5.325</strong>, Min: <strong>6.3653</strong></p>

//                 <div class="d-flex flex-row align-items-center">
//                   <p class="mb-0 me-4">Scattered Clouds</p>
//                   <i class="fas fa-cloud fa-3x" style="color: #eee"></i>
//                 </div>
//               </div>
//             </div> */
// }
