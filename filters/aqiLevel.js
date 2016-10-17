'use strict';

app.filter('aqiLevel', ['AQI', function (AQI) {
    return function (value, standard) {
        if (value === undefined) {
            return null;
        }

        return AQI(standard, value).level;
    };
}]);
