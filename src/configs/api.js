'use strict';

var env = 'online';

app.constant('API_SERVER', {
    online: {
        api: 'https://m.jinyufeili.com/api/'
    }
}[env]);
