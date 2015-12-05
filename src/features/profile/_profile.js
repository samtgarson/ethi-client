angular.module('profile', [])
    .controller('profileController', function($scope, $stateParams, User) {
      $scope.user = User;
    });