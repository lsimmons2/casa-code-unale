angular.module('myServ', []).factory('AuthService', ['$q', '$timeout', '$http', '$location',
	function ($q, $timeout, $http, $location) {
	     var user = null;

	     function loggedIn(req, res, next){
		 if(req.user){
		     next();
		 } else {
		     res.redirect('login');
		 }
	     }

	function isLoggedIn() {
	    if(user) {
		return true;
	    } else {
		return false;
	    }
	}

	function getUserStatus() {
	    return $http.get('/app/status')
		.success(function (data) {
			if(data.status){
			    user = true;
			    return user;
			} else {
			    user = false;
			    return user;
			}
		    })
		.error(function (data){
			user = false;
			return user;
		    });
	}


	function login(username, password) {
	    var deferred = $q.defer();
	    $http.post('/app/login',
		       {username: username, password: password})
		.success(function (data, status) {
			if(status === 200 && data.status){
			    user = true;
			    deferred.resolve();
			} else {
			    user = false;
			    deferred.reject();
			}
		    })
		.error(function (data) {
			user = false;
			deferred.reject();
		    });
	    return deferred.promise;

	}

	function logout() {
	    var deferred = $q.defer();
	    $http.get('/app/logout')
		.success(function (data) {
			user = false;
			deferred.resolve();
		    })
		.error(function (data) {
			user = false;
			deferred.reject();
		    });
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
