// var oneCall =
//   "https://api.openweathermap.org/data/2.5/onecall/timemachine?lat=%27+" +
//   cityLat +
//   "&lon=" +
//   cityLong +
//   "&dt=" +
//   currentTimeUni +
//   "&units=imperial&appid=" +
//   APIkey;

var searchInput = document.getElementById("search-input");
console.log(searchInput);
var buttonInput = document.getElementById("search-button");

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
      console.log(data);
      var lattitude = data.[0].lat
      var longitude = data.[0].lon
      var oneCallAPI = 'https://api.openweathermap.org/data/2.5/onecall/timemachine?lat='
    });
}
