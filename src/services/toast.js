'use strict';

app.service('Toast', ['$timeout', function ($timeout) {
    var Toast = {
        message: null
    };

    Toast.info = function (message) {
        Toast.message = message;

        $timeout(function () {
            Toast.message = null;
        }, 2000);
    };

    return Toast;
}]);
