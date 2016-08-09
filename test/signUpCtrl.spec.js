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
	var scope, $location, createController;
	beforeEach(inject(function($rootScope, $controller, _$location_){
		    $location = _$location_;
		    scope = $rootScope.$new();

		    createController = function(){
			return $controller('SignUpController', {
				'$scope' : scope
			    });
		    };
		}));
	it('Controller defined', function(){
		var controller = createController();
		expect(controller).toBeDefined();
	    });
	describe('remSkillTL()', function(){
		it('Function defined', function(){
			var controller = createController();
			expect(scope.remSkillTL).toBeDefined();
		    });
	    });
	describe('remSkillTO()', function(){
		it('Function defined', function(){
			var controller = createController();
			expect(scope.remSkillTO).toBeDefined();
		    });
	    });
	describe('sendUserData()', function(){
		it('Function defined', function(){
			var controller = createController();
			expect(scope.sendUserData).toBeDefined();
		    });
	    });
	describe('logout()', function(){
		it('Function defined', function(){
			var controller = createController();
			expect(scope.logout).toBeDefined();
		    });
	    });
	describe('register()', function(){
		it('Function defined', function(){
			var controller = createController();
			expect(scope.register).toBeDefined();
		    });
	    });
	describe('open()', function(){
		it('Function defined', function(){
			var controller = createController();
			expect(scope.open).toBeDefined();
		    });
	    });
	
	/*beforeEach(inject(function(_$controller_){
		    $controller = _$controller_;
		}));
	it('Controller defined', function(){
		expect($controller).toBeDefined();
		});*/
    });


