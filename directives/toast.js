'use strict';

app.directive('toast', ['Toast', function (Toast) {
    return {
        restrict: 'E',
        templateUrl: 'directives/toast.html',
        scope: {},
        link: function ($scope) {
            $scope.Toast = Toast;
        }
    };
}]);
