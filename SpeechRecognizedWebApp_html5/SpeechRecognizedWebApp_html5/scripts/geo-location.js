(function (navigator) {
    "use_strict";
    if (!navigator.geolocation) {
        console.log("Geolocation is not supported");
    }

    window.gps = {};

    function rad(x) {
        return x * Math.PI / 180;
    }

    // Distance in kilometers between two points using the Haversine algo.
    function getDistance(p1, p2) {
        var r = 6371;
        var dLat = rad(p2.latitude - p1.latitude);
        var dLong = rad(p2.longitude - p1.longitude);
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(rad(p1.latitude)) * Math.cos(rad(p2.latitude)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = r * c;
        return Math.round(d * 1000) / 1000;
    }

    function position(coords) {
        this.coords = coords;
        return {
            coords: coords,
            getDistance: function (targetCoords) {
                return getDistance(coords, targetCoords);
            }
        }
    }

    function getLocation(callback) {
        navigator.geolocation.getCurrentPosition(function (pos) {
            if (callback) {
                callback(new position(pos.coords));
            }
        });
    }

    window.gps.getLocation = getLocation;
    window.gps.getDistance = getDistance;
})(window.navigator);