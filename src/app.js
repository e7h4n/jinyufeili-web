'use strict';

var APP_MODULE_NAME = 'tutor-crm-web';

var app = angular.module(APP_MODULE_NAME, [
    'ngRoute',
    'ngResource'
]);

window.app = app;

$(function () {
    document.body.innerHTML =
        '<toast-list></toast-list>' +
        '<div ng-view></div>';
    document.body.setAttribute('ontouchstart', '');

    angular.bootstrap(document, [APP_MODULE_NAME]);
});

function onUpdateReady() {
    if(window.applicationCache.status === window.applicationCache.UPDATEREADY) {
        window.location.reload();
    }
}

window.applicationCache.addEventListener('updateready', onUpdateReady);

setInterval(function () {
    try {
        window.applicationCache.update();
    } catch (e) {}
}, 60000);

try {
    window.applicationCache.update();
} catch (e) {}
