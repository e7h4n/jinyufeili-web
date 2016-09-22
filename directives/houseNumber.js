'use strict';

app.directive('houseNumber', [
    'REGION',
    function (REGION) {
        return {
            restrict: 'E',
            scope: {
                region: '=',
                building: '=',
                unit: '='
            },
            require: 'ngModel',
            templateUrl: 'directives/houseNumber.html',
            link: function ($scope, $elem, $attrs, ngModel) {
                function formatter(val) {
                    if ($scope.region && $scope.building && $scope.unit) {
                        $scope.houseNumbers = _.findWhere(_.findWhere(_.findWhere(REGION, {
                            id: $scope.region
                        }).buildings, {
                            id: $scope.building
                        }).units, {
                            id: $scope.unit
                        }).houseNumbers;
                    } else {
                        $scope.houseNumbers = null;
                    }

                    if ($scope.houseNumbers && val) {
                        $scope.houseNumber = _.findWhere($scope.houseNumbers, {
                            id: val
                        });
                    } else {
                        val = 0;
                    }

                    return val;
                }

                $scope.regions = REGION;

                ngModel.$formatters.push(formatter);

                $scope.$watch('houseNumber.id', function (val) {
                    ngModel.$setViewValue(val || 0);
                });

                $scope.$watchGroup(['region', 'building', 'unit'], function () {
                    formatter($scope.houseNumber ? $scope.houseNumber.id : 0);
                });
            }
        };
    }
]);
