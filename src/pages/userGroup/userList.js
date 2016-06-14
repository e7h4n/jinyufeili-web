'use strict';

app.controller('UserGroupUserListCtrl', [
    'UserGroup',
    'User',
    '$scope',
    '$routeParams',
    'user',
    function (UserGroup, User, $scope, $routeParams, user) {
        $scope.requestUser = user;
        $scope.users = User.query({
            groupId: $routeParams.groupId
        });

        if ($routeParams.groupId !== '0') {
            $scope.group = UserGroup.get({
                groupId: $routeParams.groupId
            });
        } else {
            $scope.group = {
                id: 0,
                name: '未分组'
            };
        }
    }
]);
