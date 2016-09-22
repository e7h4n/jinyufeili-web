'use strict';

app.service('User', ['$resource', function ($resource) {
    return $resource('/api/users/:userId', {
        userId: '@id'
    }, {
        current: {
            method: 'GET',
            url: '/api/users/current'
        },
        queryFree: {
            method: 'GET',
            url: '/api/users/free',
            isArray: true
        },
        queryUnbinded: {
            method: 'GET',
            url: '/api/users/unbinded',
            isArray: true
        }
    });
}]);

app.service('CurrentUser', ['User', 'Loading', 'ForbiddenException', function (User, Loading, ForbiddenException) {
    var promise = User.current().$promise.then(function (user) {
        user.roles = user.groups.reduce(function (memo, curr) {
            memo[curr.name] = true;
            return memo;
        }, {});
        return user;
    });

    Loading.info('数据加载中', promise);

    return promise.then(function (user) {
        if (!user.resident || !user.resident.id) {
            throw new ForbiddenException();
        }
        return user;
    });
}]);
