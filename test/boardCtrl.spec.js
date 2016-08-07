describe('BoardController', function(){
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('myServ'));
	beforeEach(module('boardCtrl'));
	beforeEach(module(function($provide){
		    $provide.value('userData', function(){
			    return [{bio: "sup?",
				    email: "bob@bob.com",
				    firstName: "bob",
				    lastName: "bob",
				    skillsTL: [
					      "python",
					      "javascript"
					      ],
				    skillsTO: [
					       "regex"
					       ],
				    username: "bob"
				    }];
				    });
				    }));
	var $controller;
	beforeEach(inject(function(_$controller_){
		    $controller = _$controller_;
		}));
	it('Controller defined', function(){
		expect($controller).toBeDefined();
	    });
	describe('$scope.open()', function(){
		var $scope;
		var controller;
		beforeEach(function(){
			$scope = {};
			controller = $controller('BoardController', {$scope: $scope});
		    });
		it('Function defined', function(){
			expect($scope.open).toBeDefined();
		    });
		    });
    });