'use strict';

app.controller('UserDetailCtrl', [
    '$scope',
    'User',
    'user',
    '$routeParams',
    'Loading',
    'Toast',
    function ($scope, User, user, $routeParams, Loading, Toast) {
    $scope.requestUser = user;

    $scope.user = User.get({
        userId: $routeParams.userId
    });

    $scope.remove = function () {
        var promise = $scope.user.$remove();
        Loading.info('正在删除用户...', promise);

        promise.then(function () {
            Toast.info('删除成功');
            history.back();
        });
    };
}]);
