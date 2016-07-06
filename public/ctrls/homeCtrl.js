angular.module('homeCtrl', [])
	.controller('HomeController', function($scope, $http){
		$scope.message = 'hello';
		$scope.getUsers = function(){
		$http({
			method: 'GET',
			url: 'https://api.stackexchange.com/2.2/tags?page=1&pagesize=100&order=desc&sort=popular&site=stackoverflow'
		}).then(function success(res){
			console.log(res);
		}), function error(res){
			console.log(res);
		}
		console.log('getUsers() activated');
		/*$http.get('https://api.stackexchange.com/2.2/tags?page=1&pagesize=100&order=desc&sort=popular&site=stackoverflow')
			.success(function(data){
				//$location.path('/board')
				console.log(data.length);
				console.log(data);
				//this.message = data;
				//var recData = data;
				//this.message = recData;
			})
			.error(function(data){
				console.log('Error: ' + data)
			});*/
	};
});
	