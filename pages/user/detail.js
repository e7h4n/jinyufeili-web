'use strict';

app.controller('UserDetailCtrl', [
    '$scope',
    'User',
    'user',
    '$routeParams',
    function ($scope, User, user, $routeParams) {
    $scope.requestUser = user;

    $scope.user = User.get({
        userId: $routeParams.userId
    });
}]);
