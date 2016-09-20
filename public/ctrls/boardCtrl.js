angular.module('boardCtrl', []).controller('BoardController', function($scope, $log, users, $uibModal, $filter, $location, AuthService){
	$scope.goToUser = function(username){
		console.log('username: ', username);
		var path = '/user/' + username;
		$location.path(path);
	};
	$scope.users = users;
	$scope.skillsTOSearch = '';
	$scope.skillsTLSearch = '';
	$scope.open = function (userEmail) {
		var modalTemplate = '';
		AuthService.getUserStatus()
		.then(function(data){
			if(data){
				modalTemplate = 'loggedInModal.html';
			} else {
				modalTemplate = 'notLoggedInModal.html';
			}
			$uibModal.open({
				templateUrl: modalTemplate,
				controller: 'ModalController',
				resolve: {
					userEmail: function () {
						return userEmail;
					}
				}
			});
		}, function(error){
			console.log(error);
		});
	};
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


angular.module('modalCtrl', []).controller('ModalController', function ($scope, $uibModalInstance, userEmail) {
	$scope.userEmail = userEmail;
	$scope.close = function () {
		$uibModalInstance.dismiss();
	};
});
