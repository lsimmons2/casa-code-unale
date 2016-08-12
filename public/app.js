angular.module('App', ['ngScrollSpy',  'ui.bootstrap', 'ngRoute', 'appRoutes', 'boardCtrl', 'logInCtrl', 'navCtrl', 'homeCtrl', 'signUpCtrl', 'signUpModalCtrl', 'profCtrl', 'modalCtrl', 'myServ', 'boardFilter']).run(function ($rootScope, $location, $route, AuthService) {
	$rootScope.$on('$routeChangeStart',
		       function (event, next, current) {
			   AuthService.getUserStatus()
			   .then(function(res){
			   	if(res.data.status && AuthService.isLoggedIn()){
			   		$rootScope.in = true;
			   	} else {
			   		$rootScope.in = false;
			   		if(next.$$route.access.restricted){
			   			$location.path('/login');
			   		}	
			   	}}, function(err){
			   		console.log(err);
			   		$rootScope.in = false;
			   		$location.path('/login');
			   	})
		       });
    });

