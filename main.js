(function () {
    'use strict';

    Vue.component('group', vux.Group);
    Vue.component('cell', vux.Cell);
    Vue.component('address', vux.Address);
    Vue.component('popup', vux.Popup);
    Vue.component('picker', vux.Picker);
    Vue.component('xInput', vux.XInput);

    window.app = Vue.extend({});
    app.router = new VueRouter();
}());
