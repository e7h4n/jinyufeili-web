'use strict';

app.service('Toast', function () {
    var Toast = {};

    Toast.error = console.error.bind(console);

    return Toast;
});
