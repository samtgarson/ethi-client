angular.module('app', [
    // Vendor
    'ui.router',
    'ct.ui.router.extras',
    'ngAnimate',
    'ngResource',
    'ngSanitize',
    'ngCookies',

    // App
    'templates',
    'states',
    'services',

    // Features
    'home',
    'process'
    
    // Patterns
])

    .config(function() {

    })

    .controller('appController', function ($scope) {
        $scope.hello = 'hello world';
        
        
    });

