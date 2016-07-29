'use strict';

var ForbiddenException = function () {
    Error.apply(this, arguments);
};

ForbiddenException.prototype = new Error();

app.constant('ForbiddenException', ForbiddenException);

app.config([
    '$provide',
    'ForbiddenException',
    function (
        $provide,
        ForbiddenException
    ) {
        $provide.decorator('$exceptionHandler', [
            '$delegate',
            'Loading',
            function ($delegate, Loading) {

                return function (exception, cause) {

                    if (exception instanceof ForbiddenException) {
                        var redirectUri = 'https://m.jinyufeili.com/api/wechat/oauth2-callback?callback=' + encodeURIComponent(location.href);
                        var path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7be39b5916d09b51&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=snsapi_userinfo&state=loginRedirect#wechat_redirect';
                        Loading.info('正在跳转登陆页面');
                        location.replace(path);
                    } else {
                        $delegate(exception, cause);
                    }
                };
            }
        ]);
    }
]);
