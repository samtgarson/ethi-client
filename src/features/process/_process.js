angular.module('process', [])
    .controller('processController', function($scope, $location, $http, $cookies, $state, Endpoint) {
        $scope.token = $cookies.get('token');
        if (!$scope.token && !$location.search().code) {
            $state.go('home');
        } else if (!$scope.token) {
            $http.post(Endpoint + '/login', {code: $location.search().code}).then(process);
        }

        function process (r) {
            if (r.status == 200) {
                $scope.token = r.data.token;
                $cookies.put('token', r.data.token);
                $http({
                    url:Endpoint + '/me',
                    method: "GET",
                    headers: {
                        'x-access-token': $scope.token
                    }
                });
            } else {
                $state.go('home');
            }
        }

        $scope.logout = function () {
            $cookies.remove('token');
            $state.go('home');
        };

        $scope.getStream = function (r) {
            $http({
                url:Endpoint + '/me/stream',
                method: "GET",
                headers: {
                    'x-access-token': $scope.token
                }
            })
                .then(function(r){
                    if (r.status == 200) {
                        console.log(r);
                    } else if (r.status == 400) {
                        $scope.logout();
                    }
                });
        };
        $scope.getMe = function (r) {
            $http({
                url:Endpoint + '/me',
                method: "GET",
                headers: {
                    'x-access-token': $scope.token
                }
            })
                .then(function(r){
                    if (r.status == 200) {
                        console.log(r);
                    } else if (r.status == 400) {
                        $scope.logout();
                    }
                });
        };
    });