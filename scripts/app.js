"use strict";

(function (Helper, Geolocation) {

    var places = null;

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

    function getPlace() {
        Helper.showElement(".btn-search");
        Helper.showElement(".search-result");
        Helper.hideStatus();

        var goto = places[Math.floor((Math.random() * (places.length - 1)))];

        document.querySelector(".search-result span").innerHTML = goto.name + " is the place to be!";
    }

    function searchNearbyRestaurants(e) {
        e.preventDefault();

        Helper.hideElement(".btn-search");
        Helper.hideElement(".search-result");
        Helper.setStatus("🏃🏼💨 Mangita sa ko...");

        if (!places) {
            Geolocation.searchNearby("restaurant").then(function (response) {
                places = response;

                getPlace();
            }, function (error) {
                Helper.showElement(".btn-search");
                Helper.setStatus("Sorry besh walay mga restaurants diri dapita ☹️. Naa siguro ka sa Mars 👽.");
            });
        } else {
            getPlace();
        }
    }

    initialize();

})(Helper, Geolocation);
