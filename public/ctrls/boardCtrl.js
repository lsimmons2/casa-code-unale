angular.module('boardCtrl', []).controller('BoardController', function($scope, $log, userData, $uibModal, $filter, AuthService){
	$scope.greeting = 'Hello, world';
	$scope.users = userData;
	$scope.skillsTOSearch = '';
	$scope.skillsTLSearch = '';
	$scope.open = function (userEmail) {
	    var modalTemplate = '';
	    AuthService.getUserStatus()
	    .then(function(data){
		    if(data.data.status){
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

//should make this filter part of the 'boardCtrl' module?
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