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
        }
    });
}]);

app.service('CurrentUser', ['User', function (User) {
    return User.current().$promise.then(function (user) {
        user.roles = user.groups.reduce(function (memo, curr) {
            memo[curr.name] = true;
            return memo;
        }, {});
        return user;
    });
}]);
