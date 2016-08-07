angular.module('App', [/*'$strap.directives', */'ngScrollSpy',  'ui.bootstrap', 'ngRoute', /*'mgcrea.jquery', 'mgcrea.bootstrap.affix',*/ 'angRoutes', 'boardCtrl', 'logInCtrl', 'navCtrl', 'homeCtrl', 'signUpCtrl', 'signUpModalCtrl', 'profCtrl', 'modalCtrl', 'myServ']).run(function ($rootScope, $location, $route, AuthService) {
	$rootScope.$on('$routeChangeStart',
		       function (event, next, current) {
			   console.log(event);
			   console.log(next);
			   console.log(current);
			   AuthService.getUserStatus()
			   .then(function(res){
			   	console.log(res.data.status);
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
