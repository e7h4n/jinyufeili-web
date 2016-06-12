'use strict';

app.controller('ErrorCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
    $scope.next = $routeParams.next;
    $scope.code = $routeParams.code;
}]);
