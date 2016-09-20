angular.module('logInCtrl', []).controller('LogInController', function($http, $location, $scope, $rootScope, AuthService){
	$scope.login = function () {
		// initial values
		$scope.error = false;
		$scope.disabled = true;
		AuthService.login($scope.email, $scope.password)
		.then(function (data) {
			$rootScope.in = true;
			$scope.disabled = false;
			$scope.loginForm = {};
			$location.path('/profile');
		})
		.catch(function (data) {
			$scope.error = true;
			angular.element('#loginWarning').css('display', 'block');
			$scope.disabled = false;
			$scope.loginForm = {};
		});
		$scope.closeLoginWarning = function(){
			angular.element('#loginWarning').css('display', 'none');
		}
	};
});
