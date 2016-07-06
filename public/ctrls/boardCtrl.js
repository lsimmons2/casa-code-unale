angular.module('boardCtrl', []).controller('BoardController', function($scope, userData){
	$scope.users = userData;
	$scope.skillsTOSearch = '';
	$scope.skillsTLSearch = '';
});
