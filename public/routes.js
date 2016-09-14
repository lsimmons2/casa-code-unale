angular.module('routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $http, AuthService){
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
		}
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
				return $http.get('/app/users')
				.then(function(res){
					return res.data;
				},
				function(err){
					console.log(err);
				});
			}]
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
				return $http.get('/app/board')
				.then(function(response){
					return response.data;
				});
			}]
		}
	});
}]);
