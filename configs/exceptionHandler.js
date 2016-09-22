'use strict';

var ForbiddenException = function () {
    Error.apply(this, arguments);
};

ForbiddenException.prototype = new Error();

var Unauthroized = function () {
    Error.apply(this, arguments);
};

Unauthroized.prototype = new Error();

app.constant('ForbiddenException', ForbiddenException);
app.constant('Unauthroized', Unauthroized);

app.config([
    '$provide',
    'ForbiddenException',
    function (
        $provide,
        ForbiddenException
    ) {
        $provide.decorator('$exceptionHandler', [
            '$delegate',
            '$injector',
            function ($delegate, $injector) {

                return function (exception, cause) {
                    var Loading = $injector.get('Loading');
                    var redirectUri = null;

                    if (exception instanceof ForbiddenException) {
                        redirectUri = 'https://m.jinyufeili.com/api/wechat/oauth2-callback?callback=' + encodeURIComponent(location.href);
                        var path = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx7be39b5916d09b51&redirect_uri=' + encodeURIComponent(redirectUri) + '&response_type=code&scope=snsapi_userinfo&state=loginRedirect#wechat_redirect';
                        Loading.info('正在跳转登陆页面');
                        location.replace(path);
                    } else if (exception instanceof Unauthroized) {
                        redirectUri = '#/users/current/bind?callback=' + encodeURIComponent(location.href);
                        Loading.info('请先登记小区用户信息再使用');
                        location.replace(redirectUri);
                    } else {
                        $delegate(exception, cause);
                    }
                };
            }
        ]);
    }
]);
