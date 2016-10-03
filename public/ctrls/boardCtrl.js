angular.module('boardCtrl', []).controller('BoardController', function($scope, $log, users, $uibModal, $filter, $location, AuthService){

	$scope.goToUser = function(username){
		console.log('username: ', username);
		var path = '/user/' + username;
		$location.path(path);
	};

	if(users instanceof Array && users.length > 0){
		$scope.users = users;
	} else {
		alert('Woops! We\'re having some issues with our server. Please try back later!');
	}


});

angular.module('boardFilter', []).filter('orderObjectBy', function() {

	return function(items, field, reverse) {
		var filtered = [];
		angular.forEach(items, function(item) {
			filtered.push(item);
		});
		filtered.sort(function (a, b) {
			return (a[field] > b[field] ? 1 : -1);
		});
		if(reverse) filtered.reverse();
		return filtered;
	};

});
