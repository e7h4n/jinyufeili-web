'use strict';

app.service('SensorDataPoint', [
    '$resource',
    function ($resource) {
        return $resource('/api/sensor/data-points/:dataPointId', {
            dataPointId: '@id'
        }, {
            queryByType: {
                url: '/api/sensor/data-points/:type',
                method: 'GET',
                isArray: true
            },
            getByType: {
                url: '/api/sensor/data-points/:type?limit=1',
                method: 'GET',
                isArray: false,
                transformResponse: function (data) {
                    return JSON.parse(data)[0];
                }
            }
        });
    }
]);
