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
		templateUrl: 'public/views/signUpLanding.html',
		controller: 'SignUpController',
		access: {
			restricted: false
		}
	})
	.when('/signup/local', {
		templateUrl: 'public/views/signUpLocal.html',
		controller: 'SignUpController',
		access: {
			restricted: false
		}
	})
	.when('/signup/linkedin', {
		templateUrl: 'public/views/signUpLinkedin.html',
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
	.when('/settings', {
		templateUrl: 'public/views/settings.html',
		controller: 'ProfileController',
		access: {
			restricted: true
		},
		resolve: {
			userData : ['$http', function($http){
				return $http.get('/app/profile')
				.then(function(data){
					return data.data;
				},
				function(data){
					console.log('Error getting data on route change to /profile: ', data);
				});
			}]
		}
	})
	.when('/login', {
		templateUrl: 'public/views/login.html',
		controller: 'LogInController',
		access: {
			restricted: false
		}
	})
	.when('/login/linkedin', {
		templateUrl: 'public/views/loginLinkedin.html',
		controller: 'LogInController',
		access: {
			restricted: false
		}
	})
	.when('/login/github', {
		templateUrl: 'public/views/loginGithub.html',
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
				return $http.get('/app/profile')
				.then(function(data){
					return data.data;
				},
				function(data){
					console.log('Error getting data on route change to /profile: ', data);
				});
			}]
		}
	})
	.when('/completeprofile', {
		templateUrl: 'public/views/compProf.html',
		controller: 'CompProfController',
		access: {
			restricted: true
		}
	})
	.when('/user/:username', {
		templateUrl: 'public/views/user.html',
		controller: 'UserController',
		access: {
			restricted: true
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
			users: ['$http', function($http){
				return $http.get('/app/users')
				.then(function(response){
					return response.data;
				});
			}]
		}
	});
}]);
