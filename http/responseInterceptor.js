(function () {
    axios.interceptors.response.use(function (response) {
        return response;
    }, function (error) {
        if (!error.response) {
            return Promise.reject(error);
        }

        var status = error.response.status;
        if (status === 403) {
            var redirectUri = 'https://m.jinyufeili.com/api/wechat/oauth2-callback?callback=' + encodeURIComponent(location.href);
            var path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7be39b5916d09b51&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=snsapi_userinfo&state=loginRedirect#wechat_redirect';
            location.replace(path);
        }

        return Promise.reject(error);
    });
}());
