'use strict';

(function () {
    var searchParams = location.search.replace(/^\?/, '').split('&').reduce(function (memo, curr) {
        memo[curr.split('=')[0]] = decodeURIComponent(curr.split('=')[1]);
        return memo;
    }, {});

    var host = 'https://m.jinyufeili.com/';
    if (searchParams.debugServer) {
        host = searchParams.debugServer;
    }

    if (host[host.length - 1] !== '/') {
        host = host + '/';
    }

    app.constant('API_SERVER', host);
}());
