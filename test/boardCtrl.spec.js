describe('BoardController', function(){
  beforeEach(module('ui.bootstrap'));
  beforeEach(module('myServ'));
  beforeEach(module('boardCtrl'));
  beforeEach(module(function($provide){
    $provide.value('users', function(){
      return [
        {bio: "sup?",
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
      },
      {bio: "sah?",
        email: "bill@bill.com",
        firstName: "bill",
        lastName: "bill",
        skillsTL: [
          "python",
          "javascript"
        ],
        skillsTO: [
          "regex"
        ],
        username: "bill"
      }
    ];
    });
  }));

  var $scope;
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $controller('BoardController', {
      $scope: $scope
    });
  }));

  describe('goToUser()', function(){
    it('Function defined', function(){
      $scope.goToUser.should.exist;
    });
  });

});
