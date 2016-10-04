angular.module('App', [
	'ui.bootstrap',
	'ngFileUpload',
	'ngRoute',
	'routes',
	'boardCtrl',
	'logInCtrl',
	'userCtrl',
	'navCtrl',
	'settingsCtrl',
	'homeCtrl',
	'signUpCtrl',
	'signUpModalCtrl',
	'profCtrl',
	'compProfCtrl',
	'authService',
	'boardFilter'
])
.run(function ($rootScope, $location, $route, AuthService) {
	$rootScope.$on('$routeChangeStart',
	function (event, next, current) {
		AuthService.getUserStatus()
		.then(function(data){
			//user not logged in
			if(!data.authenticated){
				$rootScope.in = false;
				if(next.$$route.access.restricted){
					console.log('not logged in and next path restricted, to login');
					$location.path('/login');
				}
			}
			//user logged in
			else {
				$rootScope.in = true;
				$rootScope.username = data.username;
				//user hasn't completed profile
				if(data.incomplete && next.$$route.access.restricted){
					console.log('no skills, complete prof');
					$location.path('/completeprofile');
				}
			}
		}, function(data){
			$rootScope.in = false;
			$location.path('/home');
			console.log('failure resp from app.js: ', data);
			alert('Woops! We\'re having some issues with our server. Please try back later!');
		});
	});
	$rootScope.avatar = 'https://s3.amazonaws.com/leosimmons/avatar.png';
})
.config(function($sceDelegateProvider){
	$sceDelegateProvider.resourceUrlWhitelist([
   'self',
   'https://media.licdn.com/**',
	 'https://avatars.githubusercontent.com/**'
 ]);
});
