'use strict';

app.directive('region', [
    'REGION',
    function (REGION) {
        return {
            replace: true,
            restrict: 'E',
            scope: {
            },
            require: 'ngModel',
            templateUrl: 'directives/region.html',
            link: function ($scope, $elem, $attrs, ngModel) {
                $scope.regions = REGION;

                ngModel.$formatters.push(function (val) {
                    if (val) {
                        $scope.region = _.findWhere($scope.regions, {
                            id: val
                        });
                    } else {
                        val = 0;
                    }

                    return val;
                });

                $scope.$watch('region.id', function (val) {
                    ngModel.$setViewValue(val || 0);
                });
            }
        };
    }
]);
