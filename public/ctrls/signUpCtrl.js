angular.module('signUpCtrl', ['mgcrea.ngStrap']).controller('SignUpController', function($scope, $rootScope, $location, $http, tags, AuthService, $uibModal){
	console.log(tags);
	
	$scope.firstName = '';
	$scope.lastName = '';
	$scope.username = '';
	$scope.email = '';
	$scope.bio = '';
	$scope.avatar = '';
	$scope.password = '';
	
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
		//console.log(userData);
	    $http.post('/signup', userData)
	    .success(function(data){
		    //$scope.status = 'We\'ll notify you when the site is up and running!';
		$location.path('/signedup');
		    console.log('/signup POST sent successfuly from front');
		})
	    .error(function(data){
		    console.log('Error: ' + data);
		});
	};
	$scope.terms = false;
	$scope.test = function () {
	    console.log('test function!!!');
	}

	$scope.logout = function () {
	    console.log('$scope.logout() activated');
	    AuthService.logout()
	    .then(function(){
		    $location.path('/login');
		}, function(){
		    $location.path('/login');
		});
	};
	

	$scope.register = function () {
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
			AuthService.register(userData);
			$rootScope.in = true;
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
