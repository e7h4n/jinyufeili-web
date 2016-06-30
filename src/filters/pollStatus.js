'use strict';

app.filter('pollStatus', function () {
    return function (status) {
        return {
            init: '未开始',
            published: '正在进行',
            finished: '已结束',
            cancelled: '已取消'
        }[status];
    };
});
