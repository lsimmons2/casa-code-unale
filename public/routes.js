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
	.when('/settings', {
		templateUrl: 'public/views/settings.html',
		controller: 'SettingsController',
		access: {
			restricted: true
		},
		resolve: {
			userData : ['$http', function($http){
				return $http.get('/user')
				.then(function(data){
					return data.data;
				},
				function(data){
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
				return $http.get('/users')
				.then(function(response){
					return response.data;
				});
			}]
		}
	})
	.otherwise({
		redirectTo: '/'
	});
}]);
