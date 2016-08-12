angular.module('navCtrl', []).controller('NavController', function($scope, $q, $rootScope, $http, $location, AuthService){
	$scope.masterTest = function () {
	    AuthService.stackCaller().
	    then(function(res){
		    console.log(res);
		}, function(err){
		    console.log(err);
		});
	};
	//used for testing while learning passport
	$scope.loggedIn = function () {
	    console.log('$rootScope.in: ' + $rootScope.in);
	    console.log('isLoggedIn() says: ' + AuthService.isLoggedIn());
	    AuthService.getUserStatus()
	    .then(function(data){
		    console.log('getUserStatus() says: ' + data.data.status);
		}, function(error){
		    console.log(error);
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
