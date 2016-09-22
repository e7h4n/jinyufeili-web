'use strict';

app.service('WechatSdk', ['$q', function ($q) {
    var defer = $q.defer();
    window.wx.ready(function () {
        defer.resolve(window.wx);
    });

    return defer.promise;
}]);
