'use strict';

app.service('WechatSdk', ['$q', function ($q) {
    var defer = $q.defer();
    wx.ready(function () {
        defer.resolve(wx);
    });

    return defer.promise;
}]);
