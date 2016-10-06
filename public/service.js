angular.module('authService', []).factory('AuthService', ['$q', '$timeout', '$http', '$location',
function ($q, $timeout, $http, $location) {

  function getUserStatus() {
    return $http.get('/auth/status')
    .then(function(resp){
      return resp.data;
    }, function(resp){
      return resp.data;
    });
  }

  function login(email, password) {
    var deferred = $q.defer();
    $http.post('/auth/login',
    {email: email, password: password})
    .then(function(data){
      if(data.status === 200 && data.data.authenticated){
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }, function(data){
      user = false;
      deferred.reject();
    });
    return deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();
    $http.get('/auth/logout')
    .then(function(){
      user = false;
      deferred.resolve();
    }, function(){
      user = false;
      deferred.reject();
    });
    return deferred.promise;
  }

  return ({
    getUserStatus: getUserStatus,
    login: login,
    logout: logout
  });

}]);
