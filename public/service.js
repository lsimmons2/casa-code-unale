angular.module('myServ', []).factory('AuthService', ['$q', '$timeout', '$http', '$location',
	function ($q, $timeout, $http, $location) {

	     // create user variable
	     var user = null;
	     
	     function register(userData) {
		 $http.post('/register',
			    {
				firstName: userData.firstName,
				    lastName: userData.lastName,
				    username: userData.username,
				    password: userData.password,
				    email: userData.email,
				    avatar: userData.avatar,
				    skillsTO: userData.skillsTO,
				    skillsTL: userData.skillsTL,
				    bio: userData.bio
				})
		     	.then(function(response){
			     console.log(response);
			     console.log(response.status);
			     $location.path('/board');
		    }, function(response){
			console.log('Error response received from the /register POST: ');
			console.log(response.status);
			console.log('Message: ' + response.data.err.message);
		    });

	}
	     function loggedIn(req, res, next){
		 if(req.user){
		     console.log('logged in');
		     next();
		 } else {
		     console.log('not logged in');
		     res.redirect('login');
		 }
	     }

	function isLoggedIn() {
	    if(user) {

		return true;
	    } else {
		//console.log('user not logged in');
		return false;
	    }
	}
	
	function getUserStatus() {
	    return $http.get('/status')
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
	    console.log(user);
	    //return user;
	}
	

	function login(username, password) {
	    var deferred = $q.defer();
	    $http.post('/login',
		       {username: username, password: password})
		.success(function (data, status) {
			console.log('/login POST successful');
			if(status === 200 && data.status){
			    console.log('status === 200');
			    user = true;
			    console.log(data);
			    deferred.resolve();
			} else {
			    console.log(data);
			    console.log(status);
			    console.log('else');
			    user = false;
			    deferred.reject();
			}
		    })
		.error(function (data) {
			console.log('cb error function() activated');
		        console.log(data);
			user = false;
			deferred.reject();
		    });
	    return deferred.promise;

	}

	function logout() {
	    console.log('AuthService.logout() activated');
	    var deferred = $q.defer();
	    $http.get('/logout')
		.success(function (data) {
			console.log('logged out');
			user = false;
			deferred.resolve();
		    })
		.error(function (data) {
			console.log('logged out');
			user = false;
			deferred.reject();
		    });
	    return deferred.promise;
	};

	function stackCaller() {
	    var tags1 = $http({method: 'GET', url: 'https://api.stackexchange.com/2.2/tags?page=1&pagesize=100&order=desc&sort=popular&site=stackoverflow', cache: 'true'});
	    var tags2 = $http({method: 'GET', url: 'https://api.stackexchange.com/2.2/tags?page=2&pagesize=100&order=desc&sort=popular&site=stackoverflow', cache: 'true'});
	    var tags3 = $http({method: 'GET', url: 'https://api.stackexchange.com/2.2/tags?page=3&pagesize=100&order=desc&sort=popular&site=stackoverflow', cache: 'true'});

	    return $q.all([tags1, tags2, tags3]).then(function(myTags){
		    var ans = [];
		    for(var i = 0; i < myTags.length; i++){
			for(var j=0; j<myTags[i].data.items.length; j++){
			    ans.push(myTags[i].data.items[j].name);
			}
		    }
		    //console.log(ans);
		    return ans;
		    
		});
	};

	

	return ({
		isLoggedIn: isLoggedIn,
		    getUserStatus: getUserStatus,
		    login: login,
		    logout: logout,
		    register: register,
		    stackCaller: stackCaller,
		    user: user
		    });

    }]);
