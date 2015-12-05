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
    'process',
    'profile'
    
    // Patterns
])

    .run(function($http, $cookies) {
      $http.defaults.headers.common['X-ACCESS-TOKEN'] = $cookies.get('token');
    })

    .controller('appController', function ($scope) {
        $scope.hello = 'hello world';
        
        
    });

