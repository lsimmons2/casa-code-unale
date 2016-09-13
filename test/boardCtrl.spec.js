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

  var $scope;
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $controller('BoardController', {
      $scope: $scope
    });
  }));

  describe('open()', function(){
    it('Function defined', function(){
      $scope.open.should.exist;
    });
  });

});
