angular.module('process', [])
    .controller('processController', function($scope, $location, $http, $cookies, $state, Endpoint) {
        var token = $cookies.get('token');
        if (!token && !$location.search().code) {
            $state.go('home');
        } else if (!token) {
            $http.post(Endpoint + '/login', {code: $location.search().code}).then(process);
        } else {
            $state.go('profile');
        }

        function process (r) {
            if (r.status == 200) {
                token = r.data.token;
                $cookies.put('token', r.data.token);
                $http.defaults.headers.common['X-ACCESS-TOKEN'] = token;
            } else {
                $state.go('home');
            }
        }

        $scope.logout = function () {
            $cookies.remove('token');
            $state.go('home');
        };
    });