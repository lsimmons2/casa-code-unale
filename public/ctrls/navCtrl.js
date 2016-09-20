angular.module('navCtrl', []).controller('NavController', function($scope, $q, $rootScope, $http, $location, AuthService){
	//need logout function in service because it sets the user variable there when logged out which is checked at every $routeChangeStart event
	$scope.logout = function(){
		AuthService.logout()
		.then(function(){
			$location.path('/login');
		}, function(){
			//add something to do here if user can't be logged out?
			$location.path('/login');
		});
	};
	$scope.test = function(){

	};
});
