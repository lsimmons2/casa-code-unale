angular.module('logInCtrl', []).controller('LogInController', function($http, $location, $scope, $rootScope, AuthService){
	$scope.login = function () {
		// initial values
		$scope.error = false;
		$scope.disabled = true;
		AuthService.login($scope.username, $scope.password)
		.then(function (res) {
			$location.path('/board');
			$rootScope.in = true;
			$scope.disabled = false;
			$scope.loginForm = {};
		})
		.catch(function (res) {
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
