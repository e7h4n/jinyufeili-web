'use strict';

app.service('Resident', ['$resource', function ($resource) {
    return $resource('/api/residents/:residentId', {
        residentId: '@id'
    }, {
        queryByRoom: {
            method: 'GET',
            url: '/api/residents/by-room',
            isArray: true
        }
    });
}]);
