'use strict';

app.directive('unit', [
    'REGION',
    function (REGION) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
                region: '=',
                building: '='
            },
            require: 'ngModel',
            templateUrl: 'directives/unit.html',
            link: function ($scope, $elem, $attrs, ngModel) {
                function formatter(val) {
                    if ($scope.region && $scope.building) {
                        $scope.units = _.findWhere(_.findWhere(REGION, {
                            id: $scope.region
                        }).buildings, {
                            id: $scope.building
                        }).units;

                        if ($scope.region === 1) {
                            val = 1;
                        }
                    } else {
                        $scope.units = null;
                    }

                    if ($scope.units && val) {
                        $scope.unit = _.findWhere($scope.units, {
                            id: val
                        });
                    } else {
                        val = 0;
                    }

                    return val;
                }

                $scope.regions = REGION;

                ngModel.$formatters.push(formatter);

                $scope.$watch('unit.id', function (val) {
                    ngModel.$setViewValue(val || 0);
                });

                $scope.$watchGroup(['region', 'building'], function () {
                    formatter($scope.unit ? $scope.unit.id : 0);
                });
            }
        };
    }
]);
