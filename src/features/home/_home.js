angular.module('home', [])
    .controller('homeController', function($scope, $cookies, $state) {
        var token = $cookies.get('token');
        if (token) $state.go('process');
    });