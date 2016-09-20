angular.module('signUpCtrl', ['mgcrea.ngStrap', 'tagsMod']).controller('SignUpController', function($scope, $rootScope, $location, $http, AuthService, $uibModal, tags){

	$scope.firstName = 'Leo';
	$scope.lastName = 'Simmons';
	$scope.username = 'lsimmons';
	$scope.email = 'leooscar.simmons@gmail.com';
	$scope.bio = 'sah?';
	$scope.photoURL = '';
	$scope.password = 'sah';
	$scope.passwordConf = 'sah';
	$scope.skillsListTO = tags;
	$scope.skillsListTL = tags;
	$scope.selectedSkillTO = [];
	$scope.selectedSkillsTO = ["jquery", "javascript"];
	$scope.selectedSkillTL = '';
	$scope.selectedSkillsTL = ["jquery", "javascript"];
	$scope.terms = false;
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


	$scope.terms = false;
	$scope.logout = function () {
		AuthService.logout()
		.then(function(){
			$location.path('/login');
		}, function(){
		$location.path('/login');
		});
	};
	$scope.userExists = false;

	//using 'pressed' b/c I can't get ng-dirty to work
	$scope.pressed = false;

	$scope.signup = function () {
		$scope.pressed = true;
		$scope.userExists = false;
		if($scope.terms && $scope.password === $scope.passwordConf){
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
				$location.path('/profile');
			}, function(data){
				console.log('Error signing up new user: ', data);
				//Make error modals for this
				if(data.data.message == 'email already exists'){
					$scope.userExists = true;
				}
				//and this
				else {
					console.log('res.data.message: ', res.data.message);
				}
			});
		} else if(!$scope.terms) {
			angular.element('#termsWarning').css('display', 'block');
		} else {
			angular.element('#passConfWarning').css('display', 'block');
		};
	};

	//SHOULD BE REMOVED
	$scope.linkedInSigupUp = function(){
		console.log('supp');
		var userData = {
			'skillsTO': $scope.selectedSkillsTO,
			'skillsTL': $scope.selectedSkillsTL,
			'bio': $scope.bio
		};
		$http.get('/app/auth/linkedin', userData)
		.then(function(data){

		}, function(data){

		})
	}

	$scope.open = function() {
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
