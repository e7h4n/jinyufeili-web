'use strict';

app.controller('PollDetailCtrl', [
    'Poll',
    '$routeParams',
    'VoteSheet',
    'user',
    function (Poll, $routeParams, VoteSheet, user) {
        var ctx = this;
        ctx.poll = Poll.get({
            pollId: $routeParams.pollId
        });

        ctx.voteSheet = VoteSheet.current({
            pollId: $routeParams.pollId
        });

        ctx.voteSheet.$promise.catch(function (xhr) {
            xhr.processed(404);
        });

        ctx.user = user;
    }
]);
