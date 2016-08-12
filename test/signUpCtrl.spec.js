describe('SignUpController===========', function(){
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
                        expect($scope.remSkillTL).toBeDefined();
                    });
            });
	describe('remSkillTO()', function(){
                it('Function defined', function(){
                        expect($scope.remSkillTO).toBeDefined();
                    });
            });
	describe('sendUserData()', function(){
                it('Function defined', function(){
                        expect($scope.sendUserData).toBeDefined();
                    });
            });
	describe('logout()', function(){
                it('Function defined', function(){
                        expect($scope.logout).toBeDefined();
                    });
            });
	describe('register()', function(){
                it('Function defined', function(){
                        expect($scope.register).toBeDefined();
                    });
            });
	describe('open()', function(){
                it('Function defined', function(){
                        expect($scope.open).toBeDefined();
                    });
            });
    });


