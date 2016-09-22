'use strict';

app.controller('UserEditCtrl', [
    '$scope',
    'User',
    'user',
    '$routeParams',
    'UserGroup',
    'Loading',
    '$location',
    'Toast',
    function ($scope, User, user, $routeParams, UserGroup, Loading, $location, Toast) {
    $scope.requestUser = user;

    $scope.user = User.get({
        userId: $routeParams.userId
    });

    $scope.user.$promise.then(function () {
        if (!$scope.user.room && $routeParams.roomId) {
            $scope.user.room = {
                id: parseInt($routeParams.roomId, 10)
            };
        }
    });

    $scope.groups = UserGroup.query();

    $scope.submit = function () {
        var $promise = $scope.user.$save();
        Loading.info('正在保存...', $promise);
        $promise.then(function () {
            Toast.info('保存成功');
            $location.url('/users/' + $scope.user.id);
        });
    };
}]);
