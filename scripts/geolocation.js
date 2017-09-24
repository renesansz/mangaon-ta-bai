/**
 * Geolocation method.
 */
var Geolocation = (function () {

        return {
            isBrowserCompatible: isBrowserCompatible,
            getCurrentPosition: getCurrentPosition,
            searchNearby: searchNearby
        };

        /* ======= FUNCTION DEFINITIONS ======= */

        /**
         * Check browser support for HTML5 Geolocation API.
         *
         * @return {boolean}
        */
        function isBrowserCompatible() {
            return (navigator.geolocation) ? true : false;
        }

        /**
         * Get user's current position.
         *
         * @return {Promise}
        */
        function getCurrentPosition() {
            return new Promise(function (resolve, reject) {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });
        }

        /**
         * Search nearby places by type using Google maps API.
         *
         * @param {string/array} type
         *
         * @return {Promise}
         */
        function searchNearby(type) {
            if (typeof type === "string")
                type = [type];

            return new Promise(function (resolve, reject) {
                getCurrentPosition().then(function (position) {
                    var dummyDiv = document.createElement("div");
                        dummyDiv.classList.add("hidden");
                    var curLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var service = new google.maps.places.PlacesService(document.body.appendChild(dummyDiv));
                    var request = {
                        location: curLocation,
                        radius: "1000", // In meters
                        type: type
                    }

                    service.nearbySearch(request, function (res, status) {
                        if (status == google.maps.places.PlacesServiceStatus.OK)
                            resolve(res);
                        else
                            reject(res);
                    });
                }, function (error) {
                    reject(error);
                });
            });
        }

    })();
