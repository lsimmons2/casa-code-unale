angular.module('signUpCtrl', [
	'mgcrea.ngStrap',
	'tagsMod'
])
.controller('SignUpController', function($scope, $rootScope, $location, $http, AuthService, $uibModal, tags){

	$scope.terms = false;
	$scope.pressed = false;
	$scope.emailExists = false;
	$scope.otherError = false;

	$scope.firstName = 'Leo';
	$scope.lastName = 'Simmons';
	$scope.username = 'lsimmons';
	$scope.email = 'leooscar.simmons@gmail.com';
	$scope.bio = 'sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?sah?';
	$scope.photoURL = '';
	$scope.password = 'sah';
	$scope.passwordConf = 'sah';
	$scope.skillsListTO = tags;
	$scope.skillsListTL = tags;
	$scope.selectedSkillTO = [];
	$scope.selectedSkillsTO = ['angularjs', 'node.js'];
	$scope.selectedSkillTL = '';
	$scope.selectedSkillsTL = ['machine-learning', 'artificial-intelligence'];

	$scope.$on('$typeahead.select', function(event, value, index, elem){
		if(elem.$id == 'skillsTO'){
			$scope.selectedSkillsTO.push(value);
			$scope.selectedSkillsTO.sort();
			$scope.selectedSkillTO = '';
			$scope.place = $scope.skillsListTO.indexOf(value);
			$scope.skillsListTO.splice($scope.place, 1);
		}
		else{
			$scope.selectedSkillsTL.push(value);
			$scope.selectedSkillsTL.sort();
			$scope.selectedSkillTL = '';
			$scope.place = $scope.skillsListTL.indexOf(value);
			$scope.skillsListTL.splice($scope.place, 1);
		}
		$scope.$digest();
	});

	$scope.remSkillTL = function(place) {
		$scope.skillsListTL.push($scope.selectedSkillsTL[place]);
		$scope.selectedSkillsTL.splice(place, 1);
		$scope.selectedSkillsTL.sort();
	};
	$scope.remSkillTO = function(place) {
		$scope.skillsListTO.push($scope.selectedSkillsTO[place]);
		$scope.selectedSkillsTO.splice(place, 1);
		$scope.selectedSkillsTO.sort();
	};

	$scope.signup = function () {
		$scope.pressed = true;
		$scope.emailExists = false;
		console.log('valid? ', $scope.userForm.$valid);
		console.log('match? ', $scope.password === $scope.passwordConf);
		//if($scope.terms && $scope.password === $scope.passwordConf){
		if($scope.selectedSkillsTO.length < 0 && $scope.selectedSkillsTL.length < 0 && $scope.userForm.$valid && $scope.password === $scope.passwordConf){
			var userData = {
				'firstName': $scope.firstName,
				'lastName': $scope.lastName,
				'username': $scope.username,
				'password': $scope.password,
				'photoURL': $scope.photoURL,
				'email': $scope.email,
				'skillsTO': $scope.selectedSkillsTO,
				'skillsTL': $scope.selectedSkillsTL,
				'bio': $scope.bio
			};
			$http.post('/app/signup', userData)
			.then(function(data){
				$rootScope.in = true;
				$location.path(('/user/' + $scope.username));
			}, function(data){
				console.log('Error signing up new user: ', data);
				if(data.data.message == 'email already exists'){
					$scope.emailExists = true;
				}
				else {
					console.log('Error signing up new user: ', res.data.message);
					$scope.otherError = true;
				}
			});
		}
	};

	$scope.openModal = function() {
		$uibModal.open({
			templateUrl: "termsOfUseModal.html",
			controller: 'SignUpModalController'
		});
	};

});

angular.module('signUpModalCtrl', []).controller('SignUpModalController', function ($scope, $uibModalInstance) {
	$scope.close = function(){
		$uibModalInstance.dismiss();
	};
});
