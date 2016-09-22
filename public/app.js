angular.module('App', [
	'ui.bootstrap',
	'ngFileUpload',
	'ngRoute',
	'routes',
	'boardCtrl',
	'logInCtrl',
	'userCtrl',
	'navCtrl',
	'homeCtrl',
	'signUpCtrl',
	'signUpModalCtrl',
	'profCtrl',
	'compProfCtrl',
	'modalCtrl',
	'myServ',
	'boardFilter'
])
.run(function ($rootScope, $location, $route, AuthService) {
	$rootScope.$on('$routeChangeStart',
	function (event, next, current) {
		AuthService.getUserStatus()
		.then(function(data){
			if(data.authenticated && AuthService.isLoggedIn()){
				$rootScope.in = true;
				if(!data.hasSkills){
					$location.path('/completeprofile')
				}
			} else {
				$rootScope.in = false;
				if(next.$$route.access.restricted){
					$location.path('/login');
				}
			}
		}, function(data){
			console.log('Error in AuthService.getUserStatus(): ', data);
			$rootScope.in = false;
			$location.path('/login');
		})
	});
})
.config(function($sceDelegateProvider){
	$sceDelegateProvider.resourceUrlWhitelist([
   'self',
   'https://media.licdn.com/**',
	 'https://avatars.githubusercontent.com/**'

 ]);
})
