'use strict';

app.filter('questionResult', function () {
    return function (result) {
        return {
            abstention: '弃权',
            positive: '赞成',
            negative: '反对',
            renunciation: '弃权'
        }[result];
    };
});
