angular.module('App', [/*'$strap.directives', */'ngScrollSpy',  'ui.bootstrap', 'ngRoute', /*'mgcrea.jquery', 'mgcrea.bootstrap.affix',*/ 'angRoutes', 'boardCtrl', 'logInCtrl', 'navCtrl', 'homeCtrl', 'signUpCtrl', 'profCtrl', 'modalCtrl', 'myServ']).run(function ($rootScope, $location, $route, AuthService) {
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
			   /*AuthService.getUserStatus()
			       .then(function(user){
				       if (next.restricted && !AuthService.isLoggedIn()){
				       $rootScope.in = false;
					   $location.path('/login');
					   console.log(user);
					   $route.reload();
				   } else {
				   	console.log(user);
				   	$rootScope.in = true;
				   };
				   });*/
			   /*$rootScope.backStatus = AuthService.getUserStatus();
			   console.log($rootScope.backStatus);
			   if ($rootScope.backStatus  && !AuthService.isLoggedIn()){
			       $location.path('/login');
			       $route.reload();
			       };*/
		       });
    });