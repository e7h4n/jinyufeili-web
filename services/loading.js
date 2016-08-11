'use strict';

app.service('Loading', ['$timeout', function ($timeout) {
    var Loading = {
        message: null,

        info: function (message, $promise) {
            $('#mainLoadingToast').hide();

            Loading.message = message;

            if ($promise) {
                $promise.finally(function () {
                    Loading.message = null;
                });
            } else {
                $timeout(function () {
                    Loading.message = null;
                }, 2000);
            }
        }
    };

    return Loading;
}]);
