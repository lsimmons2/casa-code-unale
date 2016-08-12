angular.module('signUpCtrl', ['mgcrea.ngStrap', 'tagsMod']).controller('SignUpController', function($scope, $rootScope, $location, $http, AuthService, $uibModal, tags){
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.username = '';
	$scope.email = '';
	$scope.bio = '';
	$scope.avatar = '';
	$scope.password = '';
	$scope.passwordConf = '';
	$scope.skillsListTO = $scope.skillsListTL = tags;
	$scope.selectedSkillTO = '';
	$scope.selectedSkillsTO = [];
	$scope.selectedSkillTL = '';
	$scope.selectedSkillsTL = [];
	$scope.terms = false;
	$scope.$on('$typeahead.select', function(event, value, index, elem){
	        if(elem.$id == 'skillsTO'){
	        	$scope.selectedSkillsTO.push(value);
			$scope.selectedSkillsTO.sort();
	        	$scope.selectedSkillTO = '';
	        	$scope.place = $scope.skillsListTO.indexOf(value);
	        	$scope.skillsListTO.splice($scope.place, 1)
	        }
	        else{
	        	$scope.selectedSkillsTL.push(value);
			$scope.selectedSkillsTL.sort();
	        	$scope.selectedSkillTL = '';
	        	$scope.place = $scope.skillsListTL.indexOf(value);
	        	$scope.skillsListTL.splice($scope.place, 1)
	        }
	       	$scope.$digest();
	});

	$scope.remSkillTL = function(place) {
		$scope.skillsListTL.push($scope.selectedSkillsTL[place]);
		$scope.selectedSkillsTL.splice(place, 1);
		$scope.selectedSkillsTL.sort();
	}
	$scope.remSkillTO = function(place) {
		$scope.skillsListTO.push($scope.selectedSkillsTO[place]);
		$scope.selectedSkillsTO.splice(place, 1);
		$scope.selectedSkillsTO.sort();
	}


	$scope.sendUserData = function(){
	    var userData = JSON.stringify({
			'firstName': $scope.firstName,
			'lastName': $scope.lastName,
			'username': $scope.username,
			'password': $scope.password,
			'avatar': $scope.avatar,
			'email': $scope.email,
			'skillsTO': $scope.selectedSkillsTO,
			'skillsTL': $scope.selectedSkillsTL,
			'bio': $scope.bio,
		});
	    $http.post('/signup', userData)
	    .success(function(data){
		$location.path('/signedup');
		})
	    .error(function(data){
		    console.log('Error: ' + data);
		});
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
	$scope.register = function () {
	    $scope.pressed = true;
	    $scope.userExists = false;
	    if($scope.terms && $scope.password == $scope.passwordConf){
			var userData = {
			    'firstName': $scope.firstName,
			    'lastName': $scope.lastName,
			    'username': $scope.username,
			    'password': $scope.password,
			    'avatar': $scope.avatar,
			    'email': $scope.email,
			    'skillsTO': $scope.selectedSkillsTO,
			    'skillsTL': $scope.selectedSkillsTL,
			    'bio': $scope.bio,
			};
			$http.post('/register', userData)
			.then(function(res){
				$location.path('/board');
				$rootScope.in = true;
			    }, function(res){
				console.log(res.data.err.name);
				if(res.data.err.name == 'UserExistsError'){
				    $scope.userExists = true;
				}
				else{
				    console.log(res.data.err.message);
				}
			    });
	    } else if(!$scope.terms) {
		angular.element('#termsWarning').css('display', 'block');
	    } else {
		angular.element('#passConfWarning').css('display', 'block');
	    };
	};

        $scope.open = function() {
	    $uibModal.open({
		templateUrl: "termsOfUseModal.html",
		controller: 'SignUpModalController'
		});
		};
});

angular.module('signUpModalCtrl', []).controller('SignUpModalController', function ($scope, $uibModalInstance) {
        $scope.close = function () {
            $uibModalInstance.dismiss();
        };
    });
