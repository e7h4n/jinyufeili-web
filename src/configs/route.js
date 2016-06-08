'use strict';

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'pages/home.html',
        controller: 'HomeCtrl',
        resolve: {
            user: 'CurrentUser'
        }
    }).
    when('/errors/:code', {
        templateUrl: 'pages/error.html',
        controller: 'ErrorCtrl'
    }).
    otherwise({
        redirectTo: '/404'
    });
}]);
