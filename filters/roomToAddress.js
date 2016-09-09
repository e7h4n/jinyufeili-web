(function () {
    function get(obj, attr) {
        var ret = obj;
        attr.split('.').forEach(function (key) {
            if (key && ret !== undefined) {
                ret = ret[key];
            }
        });

        return ret;
    }

    function set(obj, attr, val) {
        var ret = obj;
        var keys = attr.split('.');
        keys.slice(0, keys.length - 1).forEach(function (key) {
            ret[key] = ret[key] || {};
        });

        ret[keys[keys.length - 1]] = val;
    }

    app.roomToAddress = function (attr) {
        return {
            get: function () {
                var room = get(this, attr);
                if (!room) {
                    return [];
                }

                var ret = [];
                [room.region, room.building, room.unit, room.houseNumber].forEach(function (id, idx) {
                    if (idx === 0) {
                        ret[idx] = String(id);
                    } else {
                        ret[idx] = ret[idx - 1] + '-' + id;
                    }
                });

                return ret;
            },
            set: function (arr) {
                var indexes = arr[arr.length - 1].split('-').map(function (item) {
                    return parseInt(item, 10);
                });

                set(this, attr, get(this, attr) || {});
                var room = get(this, attr);
                room.region = indexes[0] || 0;
                room.building = indexes[1] || 0;
                room.unit = indexes[2] || 0;
                room.houseNumber = indexes[3] || 0;
            }
        }
    };
}());
