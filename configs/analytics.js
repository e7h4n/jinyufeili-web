'use strict';

(function () {
    app.config(['AnalyticsProvider', function (AnalyticsProvider) {
        AnalyticsProvider.setAccount({
            tracker: 'UA-450827-10',
            fields: {
                cookieDomain: 'jinyufeili.com'
            }
        });
    }]);

    /* jshint unused: false */
    app.run(['Analytics', function(Analytics) {
    }]);
}());
