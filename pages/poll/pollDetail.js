'use strict';

app.controller('PollDetailCtrl', [
    'Poll',
    '$routeParams',
    'VoteSheet',
    'user',
    '$scope',
    'ANSWER',
    function (Poll, $routeParams, VoteSheet, user, $scope, ANSWER) {
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

        ctx.formData = {};

        ctx.answers = ANSWER;

        ctx.submit = function () {
            var voteSheet = {};
            voteSheet.questionAnswer = ctx.formData.questionAnswer;
            voteSheet.resident = ctx.formData.resident;
            if (user.room) {
                voteSheet.room = user.room;
            } else {
                voteSheet.room = {
                    building: ctx.formData.building.id,
                    houseNumber: ctx.formData.houseNumber.id,
                    region: ctx.formData.region.id,
                    unit: ctx.formData.unit.id
                };
            }
        };
    }
]);
