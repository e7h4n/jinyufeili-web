'use strict';

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'pages/home.html',
        controller: 'HomeCtrl'
    }).
    otherwise({
        redirectTo: '/404'
    });
}]);
