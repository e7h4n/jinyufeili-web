'use strict';

app.service('UserGroup', ['$resource', function ($resource) {
    return $resource('/api/groups/:groupId', {
        id: '@groupId'
    });
}]);
