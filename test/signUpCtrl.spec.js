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
	describe('sendUserData()', function(){
		it('Function defined', function(){
			$scope.sendUserData.should.exist;
		});
	});
	describe('logout()', function(){
		it('Function defined', function(){
			$scope.logout.should.exist;
		});
	});
	describe('register()', function(){
		it('Function defined', function(){
			$scope.register.should.exist;
		});
	});
	describe('open()', function(){
		it('Function defined', function(){
			$scope.open.should.exist;
		});
	});
});
