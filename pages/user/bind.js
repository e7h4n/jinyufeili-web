'use strict';

app.controller('UserBindCtrl', [
    'Loading',
    '$scope',
    'REGION',
    'User',
    '$routeParams',
    'Resident',
    'Room',
    'user',
    '$location',
    function (Loading, $scope, REGION, User, $routeParams, Resident, Room, user, $location) {
        $scope.user = user;
        $scope.regions = REGION;
        $scope.formData = {};

        if ($routeParams.region) {
            $scope.formData.region = _.findWhere(REGION, {
                id: parseInt($routeParams.region, 10)
            });
        }

        if ($routeParams.building) {
            $scope.formData.building = _.findWhere($scope.formData.region.buildings, {
                id: parseInt($routeParams.building, 10)
            });
        }

        if ($routeParams.unit) {
            $scope.formData.unit = _.findWhere($scope.formData.building.units, {
                id: parseInt($routeParams.unit, 10)
            });
        }

        if ($routeParams.houseNumber) {
            $scope.formData.houseNumber = _.findWhere($scope.formData.unit.houseNumbers, {
                id: parseInt($routeParams.houseNumber, 10)
            });
        }

        $scope.$watch('formData.building', function (building) {
            if (building && $scope.formData.region && $scope.formData.region.id === 1) {
                $scope.formData.unit = building.units[0];
            }
        });

        $scope.$watch('formData', function () {
            if ($scope.form.$valid && $scope.formData.region && $scope.formData.building && $scope.formData.unit && $scope.formData.houseNumber) {
                $scope.residents = Resident.queryByRoom({
                    region: $scope.formData.region.id,
                    building: $scope.formData.building.id,
                    unit: $scope.formData.unit.id,
                    houseNumber: $scope.formData.houseNumber.id
                });

                $scope.room = Room.getByLocation({
                    region: $scope.formData.region.id,
                    building: $scope.formData.building.id,
                    unit: $scope.formData.unit.id,
                    houseNumber: $scope.formData.houseNumber.id
                });
            } else {
                $scope.residents = null;
                $scope.room = null;
            }
        }, true);

        $scope.users = User.queryFree();
        if ($routeParams.userId) {
            $scope.formData.user = User.get($routeParams);
        }

        $scope.bind = function (resident) {
            resident.userId = $scope.formData.user.id;
            var $promise = resident.$save({
                userId: $scope.formData.user.id
            });
            Loading.info('正在绑定...', $promise);

            $promise.then(function () {
                $location.url('/users/' + $scope.formData.user.id);
            });
        };
    }]);
