/*require('./ctrls/homeCtrl.js');
require('./ctrls/profCtrl.js');
require('./ctrls/signUpCtrl.js');
require('./ctrls/boardCtrl.js');
require('./ctrls/logInCtrl.js');
require('./ctrls/navCtrl.js');
require('./appRoutes.js');
require('./service.js');
require('./tags.js');*/
//sahh
angular.module('App', [
	'ui.bootstrap',
	'ngRoute',
	'routes',
	'boardCtrl',
	'logInCtrl',
	'navCtrl',
	'homeCtrl',
	'signUpCtrl',
	'signUpModalCtrl',
	'profCtrl',
	'modalCtrl',
	'myServ',
	'boardFilter'
])
.run(function ($rootScope, $location, $route, AuthService) {
	$rootScope.$on('$routeChangeStart',
	function (event, next, current) {
		AuthService.getUserStatus()
		.then(function(res){
			if(res.data.authentication && AuthService.isLoggedIn()){
				$rootScope.in = true;
			} else {
				$rootScope.in = false;
				if(next.$$route.access.restricted){
					$location.path('/login');
				}
			}
		}, function(err){
			console.log('Error in AuthService.getUserStatus(): ', err);
			$rootScope.in = false;
			$location.path('/login');
		})
	});
});
