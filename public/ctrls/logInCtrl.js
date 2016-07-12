angular.module('logInCtrl', []).controller('LogInController', function($http, $location, $scope, $rootScope, AuthService){
	$scope.login = function () {
            console.log('login() activated from controller');
            // initial values
            $scope.error = false;
            $scope.disabled = true;
            // call login from service
            AuthService.login($scope.username, $scope.password)
            // handle success
            .then(function () {
                    console.log('controller function cb success');
                    $location.path('/profile');
                    $rootScope.in = true;
                    $scope.disabled = false;
                    $scope.loginForm = {};
                })
            // handle error
            .catch(function () {
                    console.log('controller function cb error');
                    $scope.error = true;
                    $scope.errorMessage = "Invalid username and/or password";
                    $scope.disabled = false;
                    $scope.loginForm = {};
                });

	};




    });