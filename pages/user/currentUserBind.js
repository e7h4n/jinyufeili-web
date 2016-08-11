'use strict';

app.controller('CurrentUserBindCtrl', [
    'User',
    '$routeParams',
    'REGION',
    '$scope',
    'Toast',
    function (User, $routeParams, REGION, $scope, Toast) {
        var ctx = this;

        ctx.regions = REGION;

        ctx.user = User.current();
        ctx.user.$promise.then(function (user) {
            if (user.resident && user.resident.id) {
                location.replace($routeParams.callback);
                return;
            }
        });

        ctx.submit = function (verifyCode) {
            ctx.formError = null;

            if (!verifyCode) {
                ctx.step = 'verifyPhone';
                return;
            }

            var promise = ctx.user.$save({
                verifyCode: verifyCode
            });

            promise.catch(function (xhr) {
                if (xhr.status === 409) {
                    xhr.processed();
                    ctx.formError  = ctx.user.resident.name + '已经绑定了当前房间。如有问题可以在业主大群中咨询。';
                    ctx.step = 'basicInfo';
                    return;
                }

                if (xhr.status === 400) {
                    xhr.processed();
                    Toast.info(xhr.data.message);
                }

                return xhr.processed(-999);
            }).then(function () {
                Toast.info('注册成功');
                location.reload();
            });
        };
        ctx.step = 'basicInfo';
    }
]);
