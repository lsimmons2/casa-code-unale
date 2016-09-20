angular.module('userCtrl', [
  'mgcrea.ngStrap',
  'tagsMod'
]).controller('UserController', function($scope, $rootScope, $location, $route, $http, AuthService, $uibModal, $routeParams){

  $http.get('user/' + $routeParams.username)
  .then(function(data){
    console.log(data);
    $scope.user = data.data.user;
    $scope.repos = data.data.repos;
  }, function(data){
    console.log('Error getting user profile');
  });

});
