angular.module('angRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, $http){
	$routeProvider
		.when('/', {
			templateUrl: 'public/views/home.html',
			controller: 'HomeController'
		})
		.when('/signUp', {
		    templateUrl: 'public/views/signUp.html',
       	    controller: 'SignUpController as ctrl',
       	    resolve: {
       	    	tags: ['$http', function($http){
       	    		return $http.get('https://api.stackexchange.com/2.2/tags?page=1&pagesize=100&order=desc&sort=popular&site=stackoverflow')
       	    			.then(function(response){
       	    				return response.data;
       	    			});
       	    	}]
       	    }
		})
	    .when('/signedUp', {
			templateUrl: 'public/views/signedUp.html',
			controller: 'SignUpController'
		})
	    .when('/board', {
		    templateUrl: 'public/views/board.html',
       	    controller: 'BoardController',
       	    resolve: {
       	    	userData: ['$http', function($http){
       	    		return $http.get('/board')
       	    			.then(function(response){
       	    				return response.data;
       	    			});
       	    	}]
       	    }
		});

	//$locationProvider.html5Mode(true);
}]);