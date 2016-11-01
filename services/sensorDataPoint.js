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
                url: '/api/sensor/data-points/:type/latest',
                method: 'GET',
                isArray: false
            }
        });
    }
]);
