angular.module('navCtrl', []).controller('NavController', function($scope, $q, $rootScope, $http, $location, AuthService){
	$scope.masterTest = function () {
		$http.get('/app/test')
		.then(function(res){
			console.log('res: ', res);
		})

		/*AuthService.stackCaller().
		then(function(res){
			console.log('Res from AuthService.stackCaller(): ', res);
		}, function(err){
		console.log('Error from AuthService.stackCaller(): ', err);
		});*/
	};
	//used for testing while learning passport
	$scope.loggedIn = function () {
		console.log('$rootScope.in: ' + $rootScope.in);
		console.log('isLoggedIn() says: ' + AuthService.isLoggedIn());
		AuthService.getUserStatus()
		.then(function(data){
			console.log('getUserStatus() says: ' + data.data.status);
		}, function(error){
			console.log('Error calling AuthService.getUserStatus(): ', error);
		});
	};
	$scope.logout = function () {
		AuthService.logout()
		.then(function(){
			$location.path('/login');
		}, function(){
			$location.path('/login');
		});
	};
});
