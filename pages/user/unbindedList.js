'use strict';

app.controller('UserUnbindListCtrl', [
    'User',
    '$scope',
    '$routeParams',
    'user',
    function (User, $scope, $routeParams, user) {
        $scope.requestUser = user;
        $scope.users = User.queryUnbinded();
    }
]);
