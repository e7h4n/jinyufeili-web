'use strict';

app.directive('sensorPoint', [
    function () {
        return {
            templateUrl: 'directives/sensor/sensorPoint.html',
            scope: {
                data: '=point',
                unit: '=',
                title: '=',
                neverExpire: '=',
                calcValue: '=',
                calcBorderColor: '=',
                calcDesc: '='
            },
            link: function ($scope) {
                var expiredDuration = 15 * 60 * 1000; // data expires in 15 minute

                $scope.$watch('data.timestamp', function (timestamp) {
                    $scope.expired = !$scope.neverExpire && (Date.now() - timestamp > expiredDuration);
                });

                $scope.$watchGroup(['expired', 'data.value'], function (groups) {
                    var expired = groups[0];
                    var value = groups[1];
                    if (expired) {
                        $scope.borderColor = null;
                        $scope.value = null;
                        $scope.desc = null;
                        return;
                    }

                    $scope.borderColor = $scope.calcBorderColor ? $scope.calcBorderColor(value) : null;
                    $scope.value = ($scope.calcValue ? $scope.calcValue(value) : value) + ($scope.unit ? ' ' + $scope.unit : '') ;
                    $scope.desc = $scope.calcDesc ? $scope.calcDesc(value) : '';
                });
            }
        };
    }
]);
