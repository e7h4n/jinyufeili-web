'use strict';

app.controller('PollDetailCtrl', [
    'Poll',
    '$routeParams',
    'VoteSheet',
    'user',
    'REGION',
    '$scope',
    'ANSWER',
    function (Poll, $routeParams, VoteSheet, user, REGION, $scope, ANSWER) {
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

        ctx.regions = REGION;

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
            console[console.debug ? 'debug' : 'log']("ctx.formData:", ctx.formData);
        };

        $scope.$watch('ctrl.formData.room.building', function (building) {
            if (building && ctx.formData.room.region && ctx.formData.room.region.id === 1) {
                ctx.formData.room.unit = building.units[0];
            }
        });
    }
]);
