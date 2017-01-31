'use strict';

app.directive('verifyPhone', [
    '$timeout',
    '$http',
    'Loading',
    'Toast',
    function ($timeout, $http, Loading, Toast) {
        return {
            replace: true,
            templateUrl: 'directives/verifyPhone.html',
            scope: {
                phone: '=',
                onSubmit: '&'
            },
            link: function ($scope) {
                var start = null;
                var cancelPromise = null;
                var WAIT_SEC = 60;
                $scope.formData = {};

                function countdown() {
                    $scope.countdown = WAIT_SEC - Math.round((Date.now() - start) / 1000);
                    if (cancelPromise !== null) {
                        $timeout.cancel(cancelPromise);
                    }

                    if ($scope.countdown > 0) {
                        cancelPromise = $timeout(countdown, 100);
                    }
                }

                function send() {
                    start = Date.now();
                    $scope.countdown = WAIT_SEC;

                    cancelPromise = $timeout(countdown, 100);

                    var sendPromise = $http.post('/api/send-verify-code?mobilePhone=' + $scope.phone);
                    Loading.info('正在发送验证码...', sendPromise);

                    sendPromise.then(function () {
                        Toast.info('已发送');
                    }).catch(function (xhr) {
                        if (xhr.status === 409) {
                            start = parseInt(xhr.data.message);
                            Toast.info('短信正在路上');
                        }

                        return xhr.processed(409);
                    });
                }

                send();

                $scope.submit = function () {
                    $scope.onSubmit({
                        verifyCode: $scope.formData.verifyCode
                    });
                };

                $scope.resend = send;
            }
        };
    }
]);
