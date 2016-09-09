(function () {
    axios.interceptors.request.use(function (config) {
        var params = config.params || {};
        config.url = config.url.replace(/(:([a-zA-Z]+))/g, function ($0, $1, $2) {
            var key = $2;
            var ret = config.params[key];
            delete(config.params[key]);
            return ret || '';
        });
        return config;
    });
}());
