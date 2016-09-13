angular.module('myServ', []).factory('AuthService', ['$q', '$timeout', '$http', '$location',
function ($q, $timeout, $http, $location) {

  var user = null;

  function isLoggedIn() {
    if(user) {
      return true;
    } else {
      return false;
    }
  }

  function getUserStatus() {
    return $http.get('/app/status')
    .then(function(data){
      if(data.authenticated){
        user = true;
        return user;
      } else {
        user = false;
        return user;
      }
    }, function(data){
      user = false;
      return user;
    })
  }


  function login(username, password) {
    var deferred = $q.defer();
    $http.post('/app/login',
    {username: username, password: password})
    .then(function(){
      if(status === 200 && data.authenticated){
        user = true;//for isLoggedIn()^^^
        deferred.resolve();
        console.log('data: ', data);
      } else {
        console.log('Error logging in user: ', data);
        user = false;//for isLoggedIn()^^^
        deferred.reject();
      }
    }, function(){
      console.log('Error making /app/login request: ', error);
      user = false;
      deferred.reject();
    })
    return deferred.promise;
  }

  function logout() {
    var deferred = $q.defer();
    $http.get('/app/logout')
    .then(function(){
      user = false;
      deferred.resolve();
    }, function(){
      user = false;
      deferred.reject();
    })
    return deferred.promise;
  }

  return ({
    isLoggedIn: isLoggedIn,
    getUserStatus: getUserStatus,
    login: login,
    logout: logout,
    user: user
  });

}]);
