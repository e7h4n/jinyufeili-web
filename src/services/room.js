'use strict';

app.service('Room', ['$resource', function ($resource) {
    return $resource('/api/rooms/:roomId', {
        roomId: '@id'
    }, {
        getByLocation: {
            method: 'GET',
            url: '/api/rooms/by-location'
        }
    });
}]);
