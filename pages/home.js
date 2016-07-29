'use strict';

app.controller('HomeCtrl', ['$scope', 'user', 'UserGroup', 'Poll', function ($scope, user, UserGroup, Poll) {
    $scope.user = user;

    $scope.userGroups = UserGroup.query();

    $scope.polls = Poll.query({
        'status[]': ['published']
    });
}]);
