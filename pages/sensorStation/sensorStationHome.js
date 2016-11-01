'use strict';

app.controller('SensorStationHomeCtrl', [
    'AQI',
    'SensorDataPoint',
    '$q',
    'Loading',
    function (AQI, SensorDataPoint, $q, Loading) {
        function cnColor(value) {
            if (!value && value !== 0) {
                return null;
            }

            if (value >= 0 && value <= 35) {
                return '#55C4F5';
            }

            if (value <= 75) {
                return '#8CC152';
            }

            if (value <= 115) {
                return '#DEC33D';
            }

            if (value <= 150) {
                return '#F98C24';
            }

            if (value <= 250) {
                return '#E23B3B';
            }

            if (value <= 350) {
                return '#614F82';
            }

            return '#3D3C34';
        }

        function cnAdvice(value) {
            if (!value && value !== 0) {
                return null;
            }

            if (value >= 0 && value <= 35) {
                return '各类人群可正常活动。';
            }

            if (value <= 75) {
                return '极少数异常敏感人群应减少户外活动。';
            }

            if (value <= 115) {
                return '儿童、老年人及心脏病、呼吸系统疾病患者应减少长时间、高强度的户外锻炼。';
            }

            if (value <= 150) {
                return '儿童、老年人及心脏病、呼吸系统疾病患者避免长时间、高强度的户外锻炼，一般人群适量减少户外运动。';
            }

            if (value <= 250) {
                return '儿童、老年人及心脏病、肺病患者应停留在室内，停止户外运动，一般人群减少户外运动。';
            }

            if (value <= 350) {
                return '儿童、老年人和病人应停留在室内，避免体力消耗，一般人群避免户外活动。';
            }

            return '儿童、老年人和病人应停留在室内，避免体力消耗，一般人群避免户外活动。';
        }

        function usColor(value) {
            if (!value && value !== 0) {
                return null;
            }

            if (value >= 0 && value <= 15) {
                return '#55C4F5';
            }

            if (value <= 40) {
                return '#8CC152';
            }

            if (value <= 65) {
                return '#DEC33D';
            }

            if (value <= 150) {
                return '#F98C24';
            }

            if (value <= 250) {
                return '#E23B3B';
            }

            if (value <= 350) {
                return '#614F82';
            }

            return '#3D3C34';
        }

        var dataTypes = [
            'PM25',
            'TEMPERATURE',
            'HUMIDITY',
            'PRESSURE',
            'PM25_HOME',
            'TEMPERATURE_HOME',
            'HUMIDITY_HOME',
            'PRESSURE_HOME',
            'CO2_HOME',
            'FORMALDEHYDE_HOME',
            'PM25_OFFICIAL'
        ];

        var dataPromises = [];
        var dataMap = dataTypes.reduce(function (memo, curr) {
            memo[curr] = SensorDataPoint.getByType({
                type: curr
            });
            dataPromises.push(memo[curr].$promise.catch(function (xhr) {
                return xhr.processed(403);
            }));
            return memo;
        }, {});

        Loading.info('数据加载中', $q.all(dataPromises));

        this.dataGroups = [{
            title: '家里',
            dataPoints: [{
                data: dataMap['PM25_HOME'],
                title: 'PM2.5 浓度',
                unit: '微克/立方米',
                calcValue: Math.round.bind(Math),
                calcBorderColor: cnColor
            }, {
                data: dataMap['TEMPERATURE_HOME'],
                title: '温度',
                calcValue: sprintf.bind(null, '%.1f'),
                unit: '℃'
            }, {
                data: dataMap['HUMIDITY_HOME'],
                title: '湿度',
                calcValue: sprintf.bind(null, '%.1f'),
                unit: '%'
            }, {
                data: dataMap['CO2_HOME'],
                title: '二氧化碳',
                calcValue: function (value) {
                    return Math.round(value);
                },
                unit: 'ppm'
            }, {
                data: dataMap['FORMALDEHYDE_HOME'],
                title: '甲醛',
                calcValue: function (value) {
                    return Math.round(value / 10) / 100;
                },
                unit: '毫克/立方米'
            }, {
                data: dataMap['PRESSURE_HOME'],
                title: '大气压',
                calcValue: function (value) {
                    return Math.round(value) / 100;
                },
                unit: 'hPa'
            }]
        }, {
            title: '奥体中心',
            dataPoints: [{
                data: dataMap['PM25_OFFICIAL'],
                title: 'PM2.5 浓度',
                unit: '微克/立方米',
                calcValue: Math.round.bind(Math),
                calcBorderColor: cnColor,
                neverExpire: true
            }]
        }, {
            title: '小区户外',
            dataPoints: [{
                data: dataMap['PM25'],
                title: 'PM2.5 浓度',
                unit: '微克/立方米',
                calcValue: Math.round.bind(Math),
                calcBorderColor: cnColor
            }, {
                data: dataMap['PM25'],
                title: '质量指数(美标)',
                calcDesc: function (val) {
                    return AQI('us', val).level;
                },
                calcValue: function (val) {
                    return AQI('us', val).aqi;
                },
                calcBorderColor: usColor
            }, {
                data: dataMap['PM25'],
                title: '质量指数(国标)',
                calcDesc: function (val) {
                    return AQI('cn', val).level;
                },
                calcValue: function (val) {
                    return AQI('cn', val).aqi;
                },
                calcBorderColor: cnColor
            }, {
                data: dataMap['TEMPERATURE'],
                title: '温度',
                calcValue: sprintf.bind(null, '%.1f'),
                unit: '℃'
            }, {
                data: dataMap['HUMIDITY'],
                title: '湿度',
                calcValue: sprintf.bind(null, '%.1f'),
                unit: '%'
            }, {
                data: dataMap['PRESSURE'],
                title: '大气压',
                calcValue: function (value) {
                    return Math.round(value) / 100;
                },
                unit: 'hPa'
            }]
        }];

        var ctx = this;
        dataMap.PM25.$promise.then(function (data) {
            if (Date.now() - data.timestamp <= 15 * 60 * 1000) {
                ctx.advice = cnAdvice(data.value);
            }
        });
    }
]);
