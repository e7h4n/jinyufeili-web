'use strict';

app.filter('room', function () {
    return function (room) {
        var name = '';

        if (room.region === 1) {
            name = '爱公馆 ' + room.building + '-' + room.houseNumber;
        } else if (room.region === 2) {
            name = '铂爵郡 ' + room.building + '-' + room.unit + '-' + room.houseNumber;
        }

        return name;
    };
});
