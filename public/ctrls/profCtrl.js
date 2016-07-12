angular.module('profCtrl', []).controller('ProfileController', function($scope, $http, userData/*, tags*/){
	/*$scope.test = function(){
	    //console.log(userData);
	    $http.get('/users')
	    .then(function(res){
		    console.log(res.data);
		}, function(err){
		    console.log(err);
		});
	};*/
	$scope.userData = userData;
	console.log($scope.userData);
	//$scope.skillsListTL = tags;
	//$scope.skillsListTO = tags;
	$scope.skillsListTO = [".htaccess", ".net", "actionscript-3", "ajax", "algorithm",
			       "android", "angularjs", "apache", "api", "arrays", "asp.net",
			       "asp.net-mvc", "bash", "c", "c#", "c++", "class", "codeigniter",
			       "cordova", "css", "css3", "database", "django", "eclipse",
			       "entity-framework", "excel", "excel-vba", "facebook", "file",
			       "forms", "function", "git", "google-chrome", "google-maps",
			       "hibernate", "html", "html5", "image", "ios", "iphone",
			       "java", "javascript", "jquery", "json", "jsp", "laravel",
			       "linq", "linux", "list", "matlab", "maven", "mongodb",
			       "multithreading", "mysql", "node.js", "objective-c",
			       "oracle", "osx", "performance", "perl", "php",
			       "postgresql", "python", "python-2.7", "qt", "r", "regex",
			       "rest", "ruby", "ruby-on-rails", "ruby-on-rails-3",
			       "scala", "shell", "sockets", "spring", "sql",
			       "sql-server", "sql-server-2008", "sqlite", "string",
			       "swift", "swing", "symfony2", "twitter-bootstrap",
			       "uitableview", "unit-testing", "validation", "vb.net",
			       "vba", "visual-studio", "visual-studio-2010", "wcf",
			       "web-services", "windows", "winforms", "wordpress",
			       "wpf", "xaml", "xcode", "xml"];

        $scope.skillsListTL = [".htaccess", ".net", "actionscript-3", "ajax", "algorithm",
			       "android", "angularjs", "apache", "api", "arrays", "asp.net",
			       "asp.net-mvc", "bash", "c", "c#", "c++", "class", "codeigniter",
			       "cordova", "css", "css3", "database", "django", "eclipse",
			       "entity-framework", "excel", "excel-vba", "facebook", "file",
			       "forms", "function", "git", "google-chrome", "google-maps",
			       "hibernate", "html", "html5", "image", "ios", "iphone",
			       "java", "javascript", "jquery", "json", "jsp", "laravel",
			       "linq", "linux", "list", "matlab", "maven", "mongodb",
			       "multithreading", "mysql", "node.js", "objective-c",
			       "oracle", "osx", "performance", "perl", "php",
			       "postgresql", "python", "python-2.7", "qt", "r", "regex",
			       "rest", "ruby", "ruby-on-rails", "ruby-on-rails-3",
			       "scala", "shell", "sockets", "spring", "sql",
			       "sql-server", "sql-server-2008", "sqlite", "string",
			       "swift", "swing", "symfony2", "twitter-bootstrap",
			       "uitableview", "unit-testing", "validation", "vb.net",
			       "vba", "visual-studio", "visual-studio-2010", "wcf",
			       "web-services", "windows", "winforms", "wordpress",
			       "wpf", "xaml", "xcode", "xml"];


	$scope.modified = false;
	angular.element('.basicInfoInput').keydown(function(event) {
        if (event.keyCode == 13) {
            angular.element('.basicInfoInput').submit();
            $scope.modified = true;
            return false;
        }
    });

	

	

//=================General Info Buttons=================
	$scope.showButtonsBasic = function() {
	    angular.element('.buttonBasic').css('display', 'inline');
	}
	$scope.hideButtonsBasic = function() {
	    angular.element('.buttonBasic').css('display', 'none');
	}
	$scope.showInputFirstName = function() {
		angular.element('#infoFirstName').css('display', 'none');
		//angular.element('#firstNameButton').css('display', 'none');
		angular.element('#firstNameEdit').css('display', 'inline');
	}
	$scope.hideInputFirstName = function() {
		angular.element('#infoFirstName').css('display', 'inline');
		//angular.element('#firstNameButton').css('display', 'none');
		angular.element('#firstNameEdit').css('display', 'none');
	}
	$scope.showInputLastName = function() {
		angular.element('#infoLastName').css('display', 'none');
		//angular.element('#lastNameButton').css('display', 'none');
		angular.element('#lastNameEdit').css('display', 'inline');
	}
	$scope.hideInputLastName = function() {
		angular.element('#infoLastName').css('display', 'inline');
		//angular.element('#lastNameButton').css('display', 'none');
		angular.element('#lastNameEdit').css('display', 'none');
	}
	$scope.showInputEmail = function() {
		angular.element('#infoEmail').css('display', 'none');
		//angular.element('#emailButton').css('display', 'none');
		angular.element('#emailEdit').css('display', 'inline');
	}
	$scope.hideInputEmail = function() {
		angular.element('#infoEmail').css('display', 'inline');
		//angular.element('#emailButton').css('display', 'none');
		angular.element('#emailEdit').css('display', 'none');
	}
	$scope.showInputBio = function() {
		angular.element('#infoBio').css('display', 'none');
		//angular.element('#firstNameButton').css('display', 'none');
		angular.element('#bioEdit').css('display', 'inline');
	}
	$scope.hideInputBio = function() {
		angular.element('#infoBio').css('display', 'inline');
		//angular.element('#firstNameButton').css('display', 'none');
		angular.element('#bioEdit').css('display', 'none');
	}


	
//=================Skills to Learn Buttons=================
	$scope.showSkillsTLEdit = function() {
	    angular.element('.buttonTL').css('display', 'inline');
	    angular.element('#profSkillTLInputHolder').css('min-height', '0px');
	}
	$scope.hideSkillsTLEdit = function() {
	    angular.element('.buttonTL').css('display', 'none');
	    angular.element('#profSkillTLInputHolder').css('min-height', '20px');
	}  
	$scope.showSkillsTLInput = function() {
	    angular.element('#skillsTLInput').css('display', 'inline');
	    angular.element('#showSkillsTLInput').remove();
	    angular.element('#profSkillTLInputHolder').remove();
	}  		 
	$scope.remSkillTL = function(place) {
	    $scope.userData.skillsTL.splice(place, 1);
	    $scope.modified = true;
	}



//=================Skills to Offer Buttons=================
	$scope.showSkillsTOEdit = function() {
	    angular.element('.buttonTO').css('display', 'inline');
	    angular.element('#profSkillTOInputHolder').css('min-height', '0px');
	}
	$scope.hideSkillsTOEdit = function() {
	    angular.element('.buttonTO').css('display', 'none');
	    angular.element('#profSkillTOInputHolder').css('min-height', '20px');
	}  
	$scope.showSkillsTOInput = function() {
	    angular.element('#skillsTOInput').css('display', 'inline');
	    angular.element('#showSkillsTOInput').remove();
	    angular.element('#profSkillTOInputHolder').remove();
	}  		 
	$scope.remSkillTO = function(place) {
	    $scope.userData.skillsTO.splice(place, 1);
	    $scope.modified = true;
	}



//=================Bio Buttons=================
	$scope.showBioEdit = function() {
	    angular.element('#bioEditButton').css('display', 'inline');
	    //angular.element('#profSkillTOInputHolder').css('min-height', '0px');
	}
	$scope.hideBioEdit = function() {
	    angular.element('#bioEditButton').css('display', 'none');
	    //angular.element('#profSkillTOInputHolder').css('min-height', '20px');
	}  
	$scope.showBioInput = function() {
	    angular.element('#bioEditInput').css('display', 'inline');
	    angular.element('#infoBio').css('display', 'none');
	    angular.element('#bioEditButton').css('display', 'none');
	    //angular.element('#profSkillTOInputHolder').remove();
	}
	$scope.hideBioInput = function() {
	    angular.element('#bioEditInput').css('display', 'none');
	    angular.element('#infoBio').css('display', 'inline');
	    angular.element('#bioEditButton').css('display', 'inline');
	    //angular.element('#profSkillTOInputHolder').remove();
	}
	/*$scope.showButtonBio = function() {
	    angular.element('#bioButton').css('display', 'inline');
	}
	$scope.hideButtonBio = function() {
	    angular.element('#bioButton').css('display', 'none');
	}*/

	angular.element('#bioEditInput').keydown(function(event) {
        if (event.keyCode == 13) {
            angular.element('#bioEditInput').submit();
            $scope.modified = true;
            return false;
        }
    });



	$scope.updateUserData = function(){
		var userData = {
			'username' : $scope.userData.username,
			'firstName' : $scope.userData.firstName,
			'lastName' : $scope.userData.lastName,
			'email' : $scope.userData.email,
			'skillsTL' : $scope.userData.skillsTL,
			'skillsTO' : $scope.userData.skillsTO,
			'bio' : $scope.userData.bio
		}
		$http.put('/users', userData)
		.then(function(res){
			console.log(res);

		}, function(err){
			console.log(err);
		})
		angular.element('#updateButton').css('display', 'none');
		angular.element('#confirm').css('display', 'inline-block');

	};

	$scope.$on('$typeahead.select', function(event, value, index, elem){
		       if(elem.$id == 'skillsTOInput'){
			   $scope.userData.skillsTO.push(value);
			   $scope.userData.skillsTO.sort();
			   $scope.selectedSkillTO = '';
			   $scope.place = $scope.skillsListTO.indexOf(value);
			   $scope.skillsListTO.splice($scope.place, 1);
			   $scope.modified = true;
			       }
		       else if (elem.$id == 'skillsTLInput'){
			   $scope.userData.skillsTL.push(value);
			   $scope.userData.skillsTL.sort();
			   $scope.selectedSkillTL = '';
			   $scope.place = $scope.skillsListTL.indexOf(value);
			   $scope.skillsListTL.splice($scope.place, 1)
			   $scope.modified = true;
			       }
		       $scope.$digest();
		   });
    });	



	





