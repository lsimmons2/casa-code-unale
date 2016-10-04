angular.module('logInCtrl', []).controller('LogInController', function($http, $location, $scope, $rootScope, AuthService){

	$scope.badCombo = false;
	$scope.noEmail = false;
	$scope.genError = false;

	$scope.login = function () {
		// initial values
		$scope.badCombo = false;
		$scope.genError = false;
		$http.post('/auth/login',
		{email: $scope.email, password: $scope.password})
			.then(function(resp){
				console.log('resp and status', resp, status);
				if(resp.status === 200 && resp.data.authenticated){
					$location.path('/board')
				} else {
					$rootScope.in = false;
					console.log('Error logging in user: ', resp);
				}
			}, function(resp){
				if(resp.data.message == 'invalid combo'){
					console.log('invalid combo bro');
					$scope.badCombo = true;
					$rootScope.in = false;
					return;
				}
				console.log('Error making /app/login request: ', resp);
				$rootScope.in = false;
				$scope.genError = true;
			});
	};
});
