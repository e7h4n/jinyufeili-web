'use strict';

var APP_MODULE_NAME = 'tutor-crm-web';

var app = angular.module(APP_MODULE_NAME, [
    'ngRoute',
    'ngResource'
]);

window.app = app;

$(function () {
    $.getJSON('/api/wechat/js_signature', {
        url: location.href
    }).success(function (resp) {
        wx.config({
            appId: resp.appid,
            timestamp: resp.timestamp,
            nonceStr: resp.noncestr,
            signature: resp.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'onMenuShareQQ',
                'onMenuShareWeibo',
                'onMenuShareQZone',
                'getNetworkType',
                'openLocation',
                'getLocation',
                'hideOptionMenu',
                'showOptionMenu',
                'hideMenuItems',
                'showMenuItems',
                'hideAllNonBaseMenuItem',
                'showAllNonBaseMenuItem',
                'closeWindow'
            ]
        });
    });
});

$(function () {
    angular.bootstrap(document, [APP_MODULE_NAME]);
});

function onUpdateReady() {
    if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
        window.location.reload();
    }
}

window.applicationCache.addEventListener('updateready', onUpdateReady);

setInterval(function () {
    try {
        window.applicationCache.update();
    } catch (e) {}
}, 60000);

try {
    window.applicationCache.update();
} catch (e) {}
