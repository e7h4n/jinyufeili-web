'use strict';

app.directive('sensorChart', [
    'SensorDataPoint',
    '$q',
    'AQI',
    function (SensorDataPoint, $q, AQI) {
        function getColor(value) {
            if (!value) {
                return '#55C4F5';
            }

            var data = AQI('cn', value).aqi;

            if (data < 50) {
                return '#55C4F5';
            }

            if (data < 100) {
                return '#8CC152';
            }

            if (data < 150) {
                return '#DEC33D';
            }

            if (data < 200) {
                return '#F98C24';
            }

            if (data < 300) {
                return '#E23B3B';
            }

            if (data < 400) {
                return '#614F82';
            }

            return '#3D3C34';
        }

        return {
            templateUrl: 'directives/sensor/sensorChart.html',
            link: function ($scope, $elem) {
                var now = new Date();
                var endTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), 0, 0, 0).getTime();
                var startTime = endTime - 3600 * 23 * 1000;
                var commonTimes = _.range(24).map(function (i) {
                    return startTime + i * 3600 * 1000;
                });

                var pm25Points = SensorDataPoint.queryByType({
                    type: 'PM25',
                    startTime: startTime,
                    endTime: endTime + 1,
                    statisticsType: 'HOURLY'
                });

                var officialPM25Points = SensorDataPoint.queryByType({
                    type: 'PM25_OFFICIAL',
                    startTime: startTime,
                    endTime: endTime + 1,
                    statisticsType: 'HOURLY'
                });

                var chartElem = $($elem[0]).find('.chart')[0];
                $(chartElem).height(window.innerHeight / 2);

                $q.all([pm25Points.$promise, officialPM25Points.$promise]).then(function (rets) {
                    var pm25Points = _.sortBy(rets[0], function (point) {
                        return point.timestamp;
                    });
                    var officialPM25Points = _.sortBy(rets[1], function (point) {
                        return point.timestamp;
                    });

                    var i = 0;
                    var j = 0;
                    commonTimes.forEach(function (time, index) {
                        if (pm25Points[i] && pm25Points[i].timestamp !== time) {
                            pm25Points.splice(i, 0, {
                                timestamp: time,
                                value: i === 0 ? 0 : pm25Points[i - 1].value
                            });
                        }
                        i++;

                        if (officialPM25Points[j] && officialPM25Points[j].timestamp !== time) {
                            officialPM25Points.splice(j, 0, {
                                timestamp: time,
                                value: j === 0 ? 0 : officialPM25Points[j - 1].value
                            });
                        }
                        j++;
                    });

                    commonTimes.sort();

                    new Highcharts.Chart({
                        chart: {
                            renderTo: chartElem,
                            type: 'column',
                            spacingLeft: 0,
                            spacingRight: 0
                        },
                        xAxis: {
                            type: 'category',
                            labels: {
                                step: 1
                            },
                            categories: commonTimes.map(function (t) {
                                return String(new Date(t).getHours());
                            })
                        },
                        yAxis: {
                            min: 0,
                            title: false,
                            labels: {
                                enabled: false
                            }
                        },
                        title: false,
                        legend: {
                            enabled: true,
                            verticalAlign: 'top',
                            floating: true
                        },
                        plotOptions: {
                            series: {
                                pointPadding: 0.07,
                                groupPadding: 0,
                                borderWidth: 0
                            }
                        },
                        tooltip: {
                            shared: true
                        },
                        series: [{
                            name: '铂庭二区',
                            animation: false,
                            data: pm25Points.map(function (point) {
                                return {
                                    y: Math.round(point.value),
                                    color: getColor(point.value)
                                };
                            }),
                            dataLabels: {
                                type: 'column',
                                enabled: true,
                                rotation: -90,
                                color: '#FFFFFF',
                                inside: true
                            }
                        }, {
                            name: '奥体中心',
                            animation: false,
                            type: 'spline',
                            data: officialPM25Points.map(function (point) {
                                return Math.round(point.value);
                            }),
                            dataLabels: {
                                enabled: true
                            }
                        }]
                    });
                });
            }
        };
    }
]);
