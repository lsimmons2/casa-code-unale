angular.module('navCtrl', []).controller('NavController', function($scope, $q, $rootScope, $http, $location, AuthService){
	$scope.masterTest = function () {
	    AuthService.stackCaller().
	    then(function(res){
		    console.log(res);
		}, function(err){
		    console.log(err);
		});
	    //console.log(myAns);
	    /*.then( function(res){
		    console.log(res);
		}, function(err){
		    console.log(err);
		    });*/
	    /*$scope.tags1 = $http.get('https://api.stackexchange.com/2.2/tags?page=1&pagesize=100&order=desc&sort=popular&site=stackoverflow')
	    .then(function(res){
		    return res.data.items;
		});
	    $scope.tags2 =$http.get('https://api.stackexchange.com/2.2/tags?page=2&pagesize=100&order=desc&sort=popular&site=stackoverflow')
		.then(function(res){
			return res.data.items;
		    });
	    $scope.tags3 =$http.get('https://api.stackexchange.com/2.2/tags?page=3&pagesize=100&order=desc&sort=popular&site=stackoverflow')
		.then(function(res){
			return res.data.items;
		    });
	    $q.all([$scope.tags1, $scope.tags2, $scope.tags3]).then(function(returnedTags){
		    //$scope.tags = returnedTags;
		    console.log([].concat.apply([], returnedTags).length);
		}
		)*/
	    //console.log($scope.tags);
	};
	    
	$scope.loggedIn = function () {
	    console.log('$rootScope.in: ' + $rootScope.in);
	    console.log('isLoggedIn() says: ' + AuthService.isLoggedIn());
	    //console.log('getUserStatus() says: ' + AuthService.getUserStatus());
	    AuthService.getUserStatus()
	    .then(function(data){
		    console.log('getUserStatus() says: ' + data.data.status);
		}, function(error){
		    console.log(error);
		});
	};
	$scope.logout = function () {
            console.log('$scope.logout() activated');
            AuthService.logout()
            .then(function(){
                    $location.path('/login');
                }, function(){
                    $location.path('/login');
                });
        };
    });
