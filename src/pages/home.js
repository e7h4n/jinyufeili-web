'use strict';

app.controller('HomeCtrl', ['$scope', 'user', 'UserGroup', function ($scope, user, UserGroup) {
    $scope.user = user;

    $scope.userGroups = UserGroup.query();
}]);
