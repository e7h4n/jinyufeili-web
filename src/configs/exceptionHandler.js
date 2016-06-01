'use strict';

var ForbiddenException = function () {
    Error.apply(this, arguments);
};

ForbiddenException.prototype = new Error();

app.constant('ForbiddenException', ForbiddenException);

app.config([
    '$provide',
    'ForbiddenException',
    '$injector',
    function (
        $provide,
        ForbiddenException,
        $injector
    ) {
        $provide.decorator('$exceptionHandler', [
            '$delegate',
            function ($delegate) {
                var $location = null;
                var $log = null;

                return function (exception, cause) {
                    if (!$location) {
                        try {
                            $location = $injector.get('$location');
                        } catch (e) {
                            $location = null;
                        }
                    }

                    if (!$log) {
                        try {
                            $log = $injector.get('$log');
                        } catch (e) {
                            $log = null;
                        }
                    }

                    if (exception instanceof ForbiddenException) {
                        var path = '/login?service=' + encodeURIComponent($location.absUrl());
                        if ($location) {
                            $location.replace(path);
                        } else {
                            window.location.replace(path);
                        }
                    } else {
                        $delegate(exception, cause);
                    }
                };
            }
        ]);
    }
]);
