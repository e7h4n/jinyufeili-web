(function () {
    Vue.filter('houseNumber', function (room) {
        if (!room) {
            return room;
        }

        var ret = '';
        if (room.region === 1) {
            ret += '爱公馆 ';
        } else if (room.region === 2) {
            ret += '铂爵郡 ';
        }

        ret += room.building;
        ret += '-' + room.unit;
        ret += '-' + room.houseNumber;

        return ret;
    });
}());
