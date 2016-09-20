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
      if(data.data.authenticated){
        console.log('User is authenticated on server');
        user = true;
        return data.data;
      } else {
        console.log('User is not authenticated on server');
        user = false;
        return data.data;
      }
    }, function(data){
      console.log('Error checking if user is authenticated on server');
      user = false;
      return data.data;
    })
  }

  function login(email, password) {
    var deferred = $q.defer();
    $http.post('/app/login',
    {email: email, password: password})
    .then(function(data){
      console.log('data and status', data, status);
      if(data.status === 200 && data.data.authenticated){
        user = true;//for isLoggedIn()^^^
        deferred.resolve();
        console.log('data: ', data);
      } else {
        console.log('Error logging in user: ', data);
        user = false;//for isLoggedIn()^^^
        deferred.reject();
      }
    }, function(data){
      console.log('Error making /app/login request: ', data);
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
