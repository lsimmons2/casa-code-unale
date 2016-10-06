angular.module('userCtrl', [
  'mgcrea.ngStrap',
  'tagsMod'
])
.controller('UserController', function($scope, $location, $http, $routeParams){

  $http.get('/users/' + $routeParams.username)
  .then(function(resp){
    $scope.user = resp.data.user;
    $scope.repos = resp.data.repos;
  }, function(resp){
    alert('Woops! This user\'s profile is unavailable right now. Bringing you back to the board.')
    $location.path('/board');
  });

});
