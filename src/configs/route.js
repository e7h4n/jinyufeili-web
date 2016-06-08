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
    otherwise({
        redirectTo: '/404'
    });
}]);
