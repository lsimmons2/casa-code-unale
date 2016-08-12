describe('ProfileController=====================', function(){
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
                        expect($scope.showButtonsBasic).toBeDefined();
                    });
            });
        describe('hideButtonsBasic()', function(){
                it('Function defined', function(){
                        expect($scope.hideButtonsBasic).toBeDefined();
                    });
            });
        describe('showInputFirstName()', function(){
                it('Function defined', function(){
                        expect($scope.showInputFirstName).toBeDefined();
                    });
            });
        describe('hideInputFirstName()', function(){
                it('Function defined', function(){
                        expect($scope.hideInputFirstName).toBeDefined();
                    });
            });
        describe('showInputLastName()', function(){
                it('Function defined', function(){
                        expect($scope.showInputLastName).toBeDefined();
                    });
            });
        describe('hideInputLastName()', function(){
                it('Function defined', function(){
                        expect($scope.hideInputLastName).toBeDefined();
                    });
            });
        describe('showInputEmail()', function(){
                it('Function defined', function(){
                        expect($scope.showInputEmail).toBeDefined();
                    });
            });
        describe('hideInputEmail()', function(){
                it('Function defined', function(){
                        expect($scope.hideInputEmail).toBeDefined();
                    });
            });
        describe('showInputBio()', function(){
                it('Function defined', function(){
                        expect($scope.showInputBio).toBeDefined();
                    });
            });
        describe('hideInputBio()', function(){
                it('Function defined', function(){
                        expect($scope.hideInputBio).toBeDefined();
                    });
            });


	//Skills to learn buttons
	
        describe('showSkillsTLEdit()', function(){
                it('Function defined', function(){
                        expect($scope.showSkillsTLEdit).toBeDefined();
                    });
            });
        describe('hideSkillsTLEdit()', function(){
                it('Function defined', function(){
                        expect($scope.hideSkillsTLEdit).toBeDefined();
                    });
            });
        describe('showSkillsTLInput()', function(){
                it('Function defined', function(){
                        expect($scope.showSkillsTLInput).toBeDefined();
                    });
            });
        describe('remSkillTL()', function(){
                it('Function defined', function(){
                        expect($scope.remSkillTL).toBeDefined();
                    });
            });

	    
	//Skills to Offer Buttons
	
	describe('showSkillsTOEdit()', function(){
                it('Function defined', function(){
                        expect($scope.showSkillsTOEdit).toBeDefined();
                    });
            });
        describe('hideSkillsTOEdit()', function(){
                it('Function defined', function(){
                        expect($scope.hideSkillsTOEdit).toBeDefined();
                    });
            });
        describe('showSkillsTOInput()', function(){
                it('Function defined', function(){
                        expect($scope.showSkillsTOInput).toBeDefined();
                    });
            });
        describe('remSkillTO()', function(){
                it('Function defined', function(){
                        expect($scope.remSkillTO).toBeDefined();
                    });
            });



	//Bio Button
        describe('updateUserData()', function(){
                it('Function defined', function(){
                        expect($scope.updateUserData).toBeDefined();
                    });
            });


	
    });