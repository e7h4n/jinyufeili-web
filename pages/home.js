(function () {
    var template = `
        <div class="weui_cells_title">个人信息</div>
        <user-info v-bind:user="user"></user-info>
        <div class="weui_cells_title">以上信息仅业主个人可见</div>
    `;

    var Home = Vue.extend({
        template: template,
        route: {
            data: function () {
                return {
                    user: app.User.current().then(function (user) {
                        if (!user.resident || !user.resident.id) {
                            app.router.go({
                                name: 'userBind',
                                params: {
                                    userId: user.id
                                }
                            });
                            return null;
                        }

                        return user;
                    })
                };
            }
        }
    });

    app.router.map({
        '/': {
            name: 'home',
            component: Home
        }
    });
}());
