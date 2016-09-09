(function () {
    window.app.User = {
        current: function () {
            return axios.get('/api/users/current').then(function (response) {
                return response.data;
            });
        },

        get: function (params) {
            return axios.get('/api/users/:userId', {
                params: params
            }).then(function (response) {
                return response.data;
            });
        }
    };
}());
