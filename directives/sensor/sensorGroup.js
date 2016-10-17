'use strict';

app.directive('sensorGroup', [
    'SensorDataPoint',
    '$q',
    function (SensorDataPoint, $q) {
        return {
            templateUrl: 'directives/sensor/sensorGroup.html',
            scope: {
                title: '=',
                dataPoints: '=points'
            },
            link: function ($scope) {
                var dataPointPromisies = $scope.dataPoints.map(function (dataPoint) {
                    return dataPoint.data.$promise;
                });

                $q.all(dataPointPromisies).then(function (dataPoints) {
                    $scope.latestTime = Math.max.apply(null, dataPoints.map(function (data) {
                        return data.timestamp;
                    }).filter(function (d) {
                        return d > 0;
                    }));
                });
            }
        };
    }
]);
