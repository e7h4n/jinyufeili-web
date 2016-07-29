'use strict';

app.service('Poll', ['$resource', function ($resource) {
    return $resource('/api/polls/:pollId', {
        pollId: '@id'
    });
}]);
