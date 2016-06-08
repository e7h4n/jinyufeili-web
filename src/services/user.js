'use strict';

app.service('User', ['$resource', function ($resource) {
    return $resource('/accounts/current');
}]);

app.service('CurrentUser', ['User', function (User) {
    return User.get().$promise.catch(function (xhr) {
        return null;
    });
}]);
