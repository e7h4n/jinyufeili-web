(function () {
    axios.get('/api/wechat/js_signature', {
        params: {
            url: location.href
        }
    }).then(function (response) {

        window.wx.config({
            appId: response.data.appid,
            timestamp: response.data.timestamp,
            nonceStr: response.data.noncestr,
            signature: response.data.signature,
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
}());
