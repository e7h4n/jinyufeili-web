'use strict';

app.service('User', ['$resource', function ($resource) {
    return $resource('/api/users/current');
}]);

app.service('CurrentUser', ['User', function (User) {
    return User.get().$promise;
}]);
