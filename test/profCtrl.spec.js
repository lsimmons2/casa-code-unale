describe('ProfileController', function(){
	beforeEach(module('profCtrl'));
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

	var $scope;
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$controller('ProfileController', {
			$scope: $scope
		});
	}));

	//General info buttons
	describe('showButtonsBasic()', function(){
		it('Function defined', function(){
			$scope.showButtonsBasic.should.exist;
		});
	});
	describe('hideButtonsBasic()', function(){
		it('Function defined', function(){
			$scope.hideButtonsBasic.should.exist;
		});
	});
	describe('showInputFirstName()', function(){
		it('Function defined', function(){
			$scope.showInputFirstName.should.exist;
		});
	});
	describe('hideInputFirstName()', function(){
		it('Function defined', function(){
			$scope.hideInputFirstName.should.exist;
		});
	});
	describe('showInputLastName()', function(){
		it('Function defined', function(){
			$scope.showInputLastName.should.exist;
		});
	});
	describe('hideInputLastName()', function(){
		it('Function defined', function(){
			$scope.hideInputLastName.should.exist;
		});
	});
	describe('showInputEmail()', function(){
		it('Function defined', function(){
			$scope.showInputEmail.should.exist;
		});
	});
	describe('hideInputEmail()', function(){
		it('Function defined', function(){
			$scope.hideInputEmail.should.exist;
		});
	});
	describe('showInputBio()', function(){
		it('Function defined', function(){
			$scope.showInputBio.should.exist;
		});
	});
	describe('hideInputBio()', function(){
		it('Function defined', function(){
			$scope.hideInputBio.should.exist;
		});
	});

	//Skills to learn buttons
	describe('showSkillsTLEdit()', function(){
		it('Function defined', function(){
			$scope.showSkillsTLEdit.should.exist;
		});
	});
	describe('hideSkillsTLEdit()', function(){
		it('Function defined', function(){
			$scope.hideSkillsTLEdit.should.exist;
		});
	});
	describe('showSkillsTLInput()', function(){
		it('Function defined', function(){
			$scope.showSkillsTLInput.should.exist;
		});
	});
	describe('remSkillTL()', function(){
		it('Function defined', function(){
			$scope.remSkillTL.should.exist;
		});
	});

	//Skills to Offer Buttons
	describe('showSkillsTOEdit()', function(){
		it('Function defined', function(){
			$scope.showSkillsTOEdit.should.exist;
		});
	});
	describe('hideSkillsTOEdit()', function(){
		it('Function defined', function(){
			$scope.hideSkillsTOEdit.should.exist;
		});
	});
	describe('showSkillsTOInput()', function(){
		it('Function defined', function(){
			$scope.showSkillsTOInput.should.exist;
		});
	});
	describe('remSkillTO()', function(){
		it('Function defined', function(){
			$scope.remSkillTO.should.exist;
		});
	});

	//Bio Button
	describe('updateUserData()', function(){
		it('Function defined', function(){
			$scope.updateUserData.should.exist;
		});
	});

});
