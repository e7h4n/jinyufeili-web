'use strict';

app.controller('ErrorCtrl', ['$routeParams', '$location', function ($routeParams, $location) {
    this.next = $routeParams.next || $location.url();
    this.code = $routeParams.code || '404';
}]);
