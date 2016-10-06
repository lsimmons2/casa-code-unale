angular.module('homeCtrl', [])
    .controller('HomeController', function($scope, $http, AuthService){
		$scope.message = 'hello';
		$scope.getUsers = function(){
		$http({
			method: 'GET',
			url: 'https://api.stackexchange.com/2.2/tags?page=1&pagesize=100&order=desc&sort=popular&site=stackoverflow'
		}).then(function success(res){
		}), function error(res){
		}
	};
});
