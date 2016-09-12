(function () {
    var template = `
    <validator name="userInfo">
        <form novalidate>
            <group title="个人信息">
                <x-input title="姓名" text-align="right" show-clear="false" is-type="china-name" :value.sync="user.resident.name"></x-input>
                <x-input title="手机号" text-align="right" show-clear="false" is-type="china-mobile" :value.sync="user.resident.mobilePhone"></x-input>
                <address title="门牌号" :value.sync="_address" :list="ADDRESS_LIST"></address>
            </group>
        </form>
    </validator>
    `;

    var User = Vue.extend({
        template: template,
        data: function () {
            return {
                ADDRESS_LIST: ADDRESS_LIST,
                value: []
            };
        },
        computed: {
            _address: app.roomToAddress('user.room')
        },
        route: {
            data: function (t) {
                var userId = t.to.params.userId;
                return {
                    user: app.User.get({
                        userId
                    })
                };
            }
        }
    });

    app.router.map({
        '/users/:userId/bind': {
            name: 'userBind',
            component: User
        }
    });
}());
