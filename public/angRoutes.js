angular.module('angRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $http, AuthService){
	$routeProvider
		.when('/', {
			templateUrl: 'public/views/home.html',
			    controller: 'HomeController',
			    access: {
			    restricted: false
				}
		})
	    .when('/signup', {
		    templateUrl: 'public/views/signUp.html',
			controller: 'SignUpController',
			access: {
			restricted: false
			    },
			resolve: {
			tags: function(AuthService){
			    return AuthService.stackCaller()
				.then(function(res){
					return res;
				    });
			}
			}
			/*resolve: {
			tags: ['$http', function($http){
				return $http.get('https://api.stackexchange.com/2.2/tags?pagesize=100&order=desc&sort=popular&site=stackoverflow')
				    .then(function(response){
					    console.log(response);
					    return response;
					});
			    }]
			    }*/
		})
	    .when('/signedup', {
		    templateUrl: 'public/views/signedUp.html',
			controller: 'SignUpController',
			access: {
			restricted: false
			    }
		})
	    .when('/login', {
		    templateUrl: 'public/views/login.html',
			controller: 'LogInController',
			access: {
			restricted: false
			    }
		})
	    .when('/profile', {
		    templateUrl: 'public/views/prof.html',
			controller: 'ProfileController',
			access: {
			restricted: true
			    },
			resolve: {
			userData : ['$http', function($http){
				return $http.get('/users')
				    .then(function(res){
					    return res.data;
					},
					function(err){
					    console.log(err);
					});
			    }]/*,
			tags: function(AuthService){
			    return AuthService.stackCaller()
				.then(function(res){
					return res;
				    });
				    }*/
		}
		})
	    .when('/welcome', {
		    templateUrl: 'public/views/welcome.html',
			controller: 'SignUpController',
			access: {
			restricted: false
			    }
		})
	    .when('/board', {
		    templateUrl: 'public/views/board.html',
			controller: 'BoardController',
			access: {
			restricted: false
			    },
			resolve: {
			userData: ['$http', function($http){
				return $http.get('/board')
				    .then(function(response){
       	    				return response.data;
       	    			});
       	    	}]
       	    }
		});
    //$locationProvider.html5Mode(true);
    /*$locationProvider.html5Mode({
	enabled: true,
	requireBase: false
    });*/
}]);
