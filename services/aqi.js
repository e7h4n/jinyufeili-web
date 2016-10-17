'use strict';

app.service('AQI', function () {
    var aqiStandards = {
        us: {
            '0': [0, '好'],
            '15': [50, '中等'],
            '40': [100, '不适于敏感人群'],
            '65': [150, '不健康'],
            '150': [200, '非常不健康'],
            '250': [300, '危险'],
            'max': [500]
        },
        cn: {
            '0': [0, '优'],
            '35': [50, '良'],
            '75': [100, '轻度污染'],
            '115': [150, '中度污染'],
            '150': [200, '重度污染'],
            '250': [300, '严重污染'],
            '350': [400, '严重污染'],
            'max': [500]
        }
    };

    return function (standard, concentration) {
        var paramAqi = aqiStandards[standard];

        var concentrationLevels = Object.keys(paramAqi).map(function (key) {
            return key === 'max' ? Infinity : parseInt(key, 10);
        });

        for (var i = 0; i < concentrationLevels.length - 1; i++) {
            if (concentration > concentrationLevels[i] && concentration <= concentrationLevels[i + 1]) {
                var iLow = paramAqi[Object.keys(paramAqi)[i]][0];
                var iHigh = paramAqi[Object.keys(paramAqi)[i + 1]][0];
                var bpLow = concentrationLevels[i];
                var bpHigh = concentrationLevels[i + 1];
                var aqi = bpHigh !== Infinity ? Math.round((((iHigh - iLow) / (bpHigh - bpLow)) * (concentration - bpLow)) + iLow) : paramAqi.max;

                return {
                    level: paramAqi[Object.keys(paramAqi)[i]][1],
                    aqi: aqi
                };
            }
        }
    };
});
