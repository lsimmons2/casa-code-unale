describe('SignUpController', function(){

	beforeEach(module('ui.bootstrap'));

	beforeEach(module('signUpCtrl'));

	beforeEach(module('authService'));

	beforeEach(module(function($provide){
		$provide.value('tags', function(){
			return [
				"skill1",
				"skill2",
				"skill3"
			];
		});
	}));

	var $scope;
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$controller = $controller('SignUpController', {
			$scope: $scope
		});
	}));

	describe('remSkillTL()', function(){
		it('Function defined', function(){
			$scope.remSkillTL.should.exist;
		});
	});

	describe('remSkillTO()', function(){
		it('Function defined', function(){
			$scope.remSkillTO.should.exist;
		});
	});

	describe('signup()', function(){
		it('Function defined', function(){
			$scope.signup.should.exist;
		});
	});

	describe('openModal()', function(){
		it('Function defined', function(){
			$scope.openModal.should.exist;
		});
	});

});
