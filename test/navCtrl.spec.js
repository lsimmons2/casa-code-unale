describe('NavController', function(){

	beforeEach(module('navCtrl'));
	beforeEach(module('myServ'));

	var $scope;
	beforeEach(inject(function($rootScope, $controller){
		$scope = $rootScope.$new();
		$controller('NavController', {
			$scope: $scope
		});
	}));

	describe('logout()', function(){
		it('Function defined', function(){
			$scope.logout.should.exist;
		})

	})

});
