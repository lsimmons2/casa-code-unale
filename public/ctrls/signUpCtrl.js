angular.module('signUpCtrl', [
	'mgcrea.ngStrap',
	'tagsMod'
])
.controller('SignUpController', function($scope, $rootScope, $location, $http, AuthService, $uibModal, tags){

	$scope.terms = false;
	$scope.pressed = false;
	$scope.emailExists = false;
	$scope.usernameExists = false;
	$scope.otherError = false;
    
    $scope.username = '';
	$scope.skillsListTO = tags;
	$scope.skillsListTL = tags;
	$scope.selectedSkillTO = '';
	$scope.selectedSkillsTO = [];
	$scope.selectedSkillTL = '';
	$scope.selectedSkillsTL = [];

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

	$scope.signup = function(){
		$scope.pressed = true;
		$scope.emailExists = false;
		$scope.usernameExists = false;
		if($scope.selectedSkillsTO.length > 0 && $scope.selectedSkillsTL.length > 0 && $scope.userForm.$valid && $scope.password === $scope.passwordConf){
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
			$http.post('/auth/signup', userData)
			.then(function(data){
				if($scope.file){
					var file = $scope.file;
					var fileLength = file.name.length;
					var username = userData.username;
					file.name = username + '_image' + file.name.slice((fileLength-4), fileLength);
					var signatureForm = {
						name: file.name,
						type: file.type
					}
					$http.post('/aws/signature', signatureForm)
					.then(function(resp){
						var config = {
							headers: {
								'Content-Type': file.type
							}
						};
						var s3Url = resp.data.s3Url;
						$http.put(resp.data.signedUrl, file, config)
						.then(function(resp){
							$rootScope.in = true;
							$location.path(('/user/' + $scope.username));
						}, function(resp){
							$rootScope.in = true;
							$location.path(('/user/' + $scope.username));
							alert('Error uploading your file. Sorry!');
						})
					}, function(resp){
						$rootScope.in = true;
						$location.path(('/user/' + $scope.username));
						alert('Error uploading your file. Sorry!');
					})
				} else {
					$rootScope.in = true;
					$location.path(('/user/' + $scope.username));					
				}
			}, function(data){
				if(data.data.message == 'email already exists'){
					$scope.emailExists = true;
				}
				if(data.data.message == 'username already exists'){
					$scope.usernameExists = true;
				}
				else {
					$scope.otherError = true;
				}
			});
		} else {
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
