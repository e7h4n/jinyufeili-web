'use strict';

app.controller('UserGroupUserListCtrl', [
    'UserGroup',
    'User',
    '$scope',
    '$routeParams',
    function (UserGroup, User, $scope, $routeParams) {
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
