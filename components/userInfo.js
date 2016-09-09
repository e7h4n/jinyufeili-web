(function () {
    var template = `
        <group>
            <cell title="业主姓名" v-bind:value="user.resident.name"></cell>
            <cell title="联系方式" v-bind:value="user.resident.mobilePhone"></cell>
            <cell title="门牌号" v-bind:value="user.room | houseNumber"></cell>
        </group>
    `;

    var UserInfo = Vue.extend({
        template: template,
        props: ['user']
    });

    Vue.component('userInfo', UserInfo);
}());
