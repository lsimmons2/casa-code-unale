angular.module('userCtrl', [
  'mgcrea.ngStrap',
  'tagsMod'
]).controller('UserController', function($scope, $rootScope, $filter, $location, $route, $http, AuthService, $uibModal, $routeParams){
  $http.get('/app/user/' + $routeParams.username)
  .then(function(resp){
    console.log('from /user', resp);
    $scope.user = resp.data.user;
    console.log('repos: ', resp.data.repos);
    $scope.repos = resp.data.repos;
  }, function(resp){
    console.log('Error getting user profile: ', resp);
  });
});
