'use strict';

app.directive('loading', ['Loading', function (Loading) {
    return {
        restrict: 'E',
        templateUrl: 'directives/loading.html',
        scope: {},
        link: function ($scope) {
            $scope.Loading = Loading;
        }
    };
}]);
