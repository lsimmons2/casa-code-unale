angular.module('compProfCtrl', [
  'mgcrea.ngStrap',
  'tagsMod',
  'signUpModalCtrl'
])
.controller('CompProfController', function($scope, $rootScope, $location, $http, AuthService, $uibModal, tags){

  $scope.userExists = false;
  $scope.pressed = false;

  $http.get('/user/completeprofile')
    .then(function(resp){
      $scope.missing = resp.data.missing;
      $scope.user = resp.data.profile;
    }, function(resp){

    })


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

  $scope.skillsListTO = tags;
	$scope.skillsListTL = tags;
	$scope.selectedSkillTO = '';
	$scope.selectedSkillsTO = [];
	$scope.selectedSkillTL = '';
	$scope.selectedSkillsTL = [];
	$scope.terms = false;

  $scope.compProf = function(){
    $scope.pressed = true;
    $scope.userExists = false;
    if($scope.selectedSkillsTO.length > 0 && $scope.selectedSkillsTL.length > 0 && $scope.userForm.$valid){
      var userData = {
        'firstName': $scope.firstName,
        'lastName': $scope.lastName,
        'username': $scope.username,
        'photoURL': $scope.photoURL,
        'email': $scope.email,
        'skillsTO': $scope.selectedSkillsTO,
        'skillsTL': $scope.selectedSkillsTL,
        'bio': $scope.bio
      };
      $http.post('/user/completeprofile', userData)
      .then(function(data){
        $rootScope.in = true;
        $location.path(('/user/' + $scope.username));
      }, function(data){
        if(data.data.message == 'username already exists'){
          $scope.userExists = true;
        }
        else {
          alert('Woops! There\'s a problem with our server. Please try again later');
        }
      });
    } else{
    };
  };



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

  $scope.openModal = function(){
		$uibModal.open({
			templateUrl: "termsOfUseModal.html",
			controller: 'SignUpModalController'
		});
	};


});
