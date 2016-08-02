angular.module('logInCtrl', []).controller('LogInController', function($http, $location, $scope, $rootScope, AuthService){
	$scope.login = function () {
            console.log('login() activated from controller');
            // initial values
            $scope.error = false;
            $scope.disabled = true;
            // call login from service
            AuthService.login($scope.username, $scope.password)
            // handle success
            .then(function (res) {
                    console.log('controller function cb success');
                    $location.path('/board');
                    $rootScope.in = true;
                    $scope.disabled = false;
                    $scope.loginForm = {};
		    console.log(res);
                })
            // handle error
            .catch(function (res) {
                    console.log('controller function cb error');
                    $scope.error = true;
		    angular.element('#loginWarning').css('display', 'block');
                    $scope.disabled = false;
                    $scope.loginForm = {};
		    console.log(res);
                });
	    $scope.closeLoginWarning = function(){
		angular.element('#loginWarning').css('display', 'none');
	    }

	};




    });
