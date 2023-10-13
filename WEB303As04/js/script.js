/*
    Assignment #4
Gursimran Singh Assi
*/

$(function () {
  // your code here
  $(document).ready(function () {
    navigator.geolocation.getCurrentPosition(done, function () {
      console.log("error");
    })

  });
  function done(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    const locationHere = $('#locationhere');
    locationHere.text(`Latitude :${latitude}  
    Longitude${longitude}  Accuracy: ${accuracy}`);

    const locationInBrowser = localStorage.getItem("location");
    const welcomeMessage = $("<h2></h2>");
    const distanceMessage = $("<p></p>");
    const accuracyMessage = $("<span></span>")
    if (locationInBrowser) {
      const coordsInBrowser = JSON.parse(locationInBrowser);
      const distance = calcDistanceBetweenPoints(
        latitude, longitude,
        coordsInBrowser.latitude,
        coordsInBrowser.longitude
      )
      welcomeMessage.text("Welcome back to the page!");
     distanceMessage.text(`You Traveleld ${distance} km since last visted`);
      $("#content").append(welcomeMessage);
      $("#content").append(distanceMessage);
    }
    else {
      welcomeMessage.text("Welcome to the page for the first time!");
      distanceMessage.text("rgggf");
      accuracyMessage.text(`Accuracy: ${accuracy} meters`);
    }

    localStorage.setItem("location", JSON.stringify({ latitude, longitude }));
  }

  // DO NOT EDIT ANY CODE IN THIS FUNCTION DEFINTION
  // function to calculate the distance in metres between two lat/long pairs on Earth
  // Haversine formula - https://en.wikipedia.org/wiki/Haversine_formula
  // Aren't those cool variable names? Yah gotta love JavaScript
  function calcDistanceBetweenPoints(lat1, lon1, lat2, lon2) {
    var toRadians = function (num) {
      return (num * Math.PI) / 180;
    };
    var R = 6371000; // radius of Earth in metres
    var φ1 = toRadians(lat1);
    var φ2 = toRadians(lat2);
    var Δφ = toRadians(lat2 - lat1);
    var Δλ = toRadians(lon2 - lon1);

    var a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  }
});
