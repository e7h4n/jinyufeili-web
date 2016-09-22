'use strict';

app.directive('building', [
    'REGION',
    function (REGION) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                region: '='
            },
            require: 'ngModel',
            templateUrl: 'directives/building.html',
            link: function ($scope, $elem, $attrs, ngModel) {
                function formatter(val) {
                    if ($scope.region) {
                        $scope.buildings = _.findWhere(REGION, {
                            id: $scope.region
                        }).buildings;
                    } else {
                        $scope.buildings = null;
                    }

                    if ($scope.buildings && val) {
                        $scope.building = _.findWhere($scope.buildings, {
                            id: val
                        });
                    } else {
                        val = 0;
                        $scope.building = null;
                    }

                    return val;
                }

                ngModel.$formatters.push(formatter);

                $scope.$watch('building.id', function (val) {
                    ngModel.$setViewValue(val || 0);
                });

                $scope.$watchGroup(['region'], function () {
                    formatter($scope.building ? $scope.building.id : 0);
                });
            }
        };
    }
]);
