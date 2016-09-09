(function () {
    var template = `
    <div class="weui_cells_title">基本信息</div>
    <user-info v-bind:user="user"></user-info>
    `;

    var User = Vue.extend({
        template: template,
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
        '/users/:userId': {
            name: 'user',
            component: User
        }
    });
}());
