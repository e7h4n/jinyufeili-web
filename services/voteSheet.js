'use strict';

app.service('VoteSheet', ['$resource', function ($resource) {
    return $resource('/api/polls/:pollId/vote-sheets/:voteSheetId', {
        voteSheetId: '@id'
    }, {
        current: {
            url: '/api/polls/:pollId/vote-sheets/current',
            method: 'GET'
        }
    });
}]);
