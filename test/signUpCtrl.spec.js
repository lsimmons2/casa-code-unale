describe('SignUpController', function(){
	beforeEach(module('ui.bootstrap'));
	beforeEach(module('signUpCtrl'));
	beforeEach(module('myServ'));
	beforeEach(module(function($provide){
                    $provide.value('tags', function(){
                            return [
				    "skill1",
				    "skill2",
				    "skill3"
					];
			});
		}));
	beforeEach(inject(function(_$controller_){
		    $controller = _$controller_;
		}));
	it('Controller defined', function(){
		expect($controller).toBeDefined();
	    });
	describe('remSkillTL()', function(){
		var $scope;
		var controller;
		beforeEach(function(){
			$scope = {};
			controller = $controller('SignUpController', {$scope: $scope});
		    });
		it('Function defined', function(){
			expect($scope.remSkillTL).toBeDefined();
		    });
	    });
    });
