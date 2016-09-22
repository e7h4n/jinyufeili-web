'use strict';

app.config(['$routeProvider', function ($routeProvider) {
    var resolve = {
        user: 'CurrentUser'
    };

    $routeProvider.
    when('/', {
        templateUrl: 'pages/home.html',
        controller: 'HomeCtrl',
        resolve: resolve
    }).
    when('/groups/:groupId/users', {
        templateUrl: 'pages/userGroup/userList.html',
        controller: 'UserGroupUserListCtrl',
        resolve: resolve
    }).
    when('/users/unbinded', {
        templateUrl: 'pages/user/unbindedList.html',
        controller: 'UserUnbindListCtrl',
        resolve: resolve
    }).
    when('/users/current/bind', {
        templateUrl: 'pages/user/currentUserBind.html',
        controller: 'CurrentUserBindCtrl',
        controllerAs: 'ctrl'
    }).
    when('/users/bind', {
        templateUrl: 'pages/user/bind.html',
        controller: 'UserBindCtrl',
        resolve: resolve
    }).
    when('/users/new', {
        templateUrl: 'pages/user/edit.html',
        controller: 'UserEditCtrl',
        resolve: resolve
    }).
    when('/users/:userId', {
        templateUrl: 'pages/user/detail.html',
        controller: 'UserDetailCtrl',
        resolve: resolve
    }).
    when('/users/:userId/edit', {
        templateUrl: 'pages/user/edit.html',
        controller: 'UserEditCtrl',
        resolve: resolve
    }).
    when('/users/bind/confirm', {
        templateUrl: 'pages/user/bindConfirm.html',
        controller: 'UserBindConfirmCtrl',
        resolve: resolve
    }).
    when('/polls/:pollId', {
        templateUrl: 'pages/poll/pollDetail.html',
        controller: 'PollDetailCtrl',
        controllerAs: 'ctrl',
        resolve: resolve
    }).
    when('/errors/:code', {
        templateUrl: 'pages/error.html',
        controller: 'ErrorCtrl',
        controllerAs: 'ctrl'
    }).
    when('/friend-links', {
        templateUrl: 'pages/friendLink.html',
    }).
    otherwise({
        templateUrl: 'pages/error.html',
        controller: 'ErrorCtrl',
        controllerAs: 'ctrl'
    });
}]);
