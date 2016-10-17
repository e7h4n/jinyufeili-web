'use strict';

app.filter('sprintf', function () {
    return function (value, format) {
        if (value) {
            return sprintf(format, value);
        }

        return null;
    };
});
