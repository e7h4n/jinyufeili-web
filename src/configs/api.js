'use strict';

var env = 'online';

app.constant('API_SERVER', {
    online: {
        api: 'https://wx.jinyufeili.com/api/'
    }
}[env]);
