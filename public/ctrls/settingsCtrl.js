angular.module('settingsCtrl', [
  'tagsMod'
])
.controller('SettingsController', function($scope, $q, $rootScope, $http, $location, AuthService, userData, tags){

  $scope.userData = userData.profile;
	$scope.linkStatus = userData.linkStatus;
	$scope.skillsListTL = tags;
  $scope.skillsListTO = tags;

  $scope.uploadImage = function(){
    var file = $scope.file;
    var fileLength = file.name.length;
    var username = $scope.userData.username;
    file.name = username + '_image' + file.name.slice((fileLength-4), fileLength);
    console.log('file.name: ', file.name);
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
        console.log('Succeess uploading file: ', resp);
        $scope.userData.local.photoURL = s3Url;
      }, function(resp){
        alert('Error uploading your file. Sorry!');
      })
    }, function(resp){

    })
  }

  $scope.$on('$typeahead.select', function(event, value, index, elem){
    if(elem.$id == 'skillsTOInput'){
      $scope.userData.skillsTO.push(value);
      $scope.userData.skillsTO.sort();
      $scope.selectedSkillTO = '';
      $scope.place = $scope.skillsListTO.indexOf(value);
      $scope.skillsListTO.splice($scope.place, 1);
    }
    else if (elem.$id == 'skillsTLInput'){
      $scope.userData.skillsTL.push(value);
      $scope.userData.skillsTL.sort();
      $scope.selectedSkillTL = '';
      $scope.place = $scope.skillsListTL.indexOf(value);
      $scope.skillsListTL.splice($scope.place, 1)
    }
    $scope.modified = true;
    $scope.saved = false;
    $scope.$digest();
  });

  $scope.remSkillTL = function(place) {
      $scope.userData.skillsTL.splice(place, 1);
      $scope.modified = true;
      $scope.saved = false;
  }

  $scope.remSkillTO = function(place) {
      $scope.userData.skillsTO.splice(place, 1);
      $scope.modified = true;
      $scope.saved = false;
  }

  $scope.deleteUser = function(){
    console.log('deleteUser() activated');
    $http.delete('/user')
    .then(function(data){
      console.log('user deleted');
      $location.path('/');
    }, function(data){
      console.log('user not deleted');
    });
  }

  $scope.updateUserData = function(){
    if($scope.userData.skillsTO.length > 0 && $scope.userData.skillsTL.length > 0)
    var userData = {
      'email' : $scope.userData.email,
      'skillsTL' : $scope.userData.skillsTL,
      'skillsTO' : $scope.userData.skillsTO,
      'bio' : $scope.userData.bio
    }
    $http.put('/user', userData)
    .then(function(res){
      console.log(res);
      $scope.saved = true;
    }, function(err){
      console.log(err);
    })
  }


});
