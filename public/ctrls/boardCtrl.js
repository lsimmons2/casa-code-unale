angular.module('boardCtrl', []).controller('BoardController', function($scope, $log, userData, $uibModal, AuthService){
	$scope.greeting = 'Hello, world';
	$scope.users = userData;
	$scope.skillsTOSearch = '';
	$scope.skillsTLSearch = '';
	$scope.test = function() {
	    console.log('test button not assigned to anything');
	};
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


angular.module('modalCtrl', []).controller('ModalController', function ($scope, $uibModalInstance, userEmail) {
	$scope.userEmail = userEmail;
	$scope.close = function () {
	    $uibModalInstance.dismiss();
	};
    });