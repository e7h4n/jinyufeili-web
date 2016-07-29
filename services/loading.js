'use strict';

app.service('Loading', function () {
    var Loading = {
        message: null,

        info: function (message, $promise) {
            $('#mainLoadingToast').hide();

            Loading.message = message;

            if ($promise) {
                $promise.finally(function () {
                    Loading.message = null;
                });
            }
        }
    };

    return Loading;
});
