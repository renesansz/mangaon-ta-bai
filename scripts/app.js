"use strict";

(function (Helper, Geolocation) {

    function initialize() {
        initalizeGeolocation();
        setListeners();
    }

    function initalizeGeolocation() {
        if (!Geolocation.isBrowserCompatible()) {
            Helper.hideElement(".btn-search");
            Helper.setStatus("Your browser does not support geolocation ☹️");
        }
    }

    function setListeners() {
        Helper.setClickListener(".btn-search", searchNearbyRestaurants);
    }

    function searchNearbyRestaurants(e) {
        e.preventDefault();

        Helper.hideElement(".btn-search");
        Helper.hideElement(".search-result");
        Helper.setStatus("🏃🏼💨 Mangita sa ko...");

        Geolocation.searchNearby("restaurant").then(function (response) {
            Helper.showElement(".btn-search");
            Helper.showElement(".search-result");
            Helper.hideStatus();

            var goto = response[Math.floor((Math.random() * (response.length - 1)))];

            document.querySelector(".search-result span").innerHTML = goto.name + " is the place to be!";
        }, function (error) {
            Helper.showElement(".btn-search");
            Helper.setStatus("Sorry besh walay mga restaurants diri dapita ☹️. Naa siguro ka sa Mars 👽.");
        });
    }

    initialize();

})(Helper, Geolocation);
