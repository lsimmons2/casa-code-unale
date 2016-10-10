describe('BoardController', function(){

  beforeEach(module('ui.bootstrap'));

  beforeEach(module('authService'));

  beforeEach(module('boardCtrl'));

  beforeEach(module(function($provide){
    $provide.value('users', function(){
      return [
      {
        username: 'username0',
        skillsTO: ['python', 'django'],
        skillsTL: ['javascript', 'node.js', 'express'],
        local: {
          email: 'user0@email.com',
          password: 'password0',
          firstName: 'firstName0',
          lastName: 'lastName0'
        }
      },
      {
        username: 'username1',
        skillsTO: ['javascript', 'node.js'],
        skillsTL: ['python', 'flask'],
        local: {
          email: 'user1@email.com',
          password: 'password1',
          firstName: 'firstName1',
          lastName: 'lastName1'
        }
      },
      {
        username: 'username2',
        skillsTO: ['ruby', 'rails'],
        skillsTL: ['linux', 'ubuntu'],
        local: {
          email: 'user1@email.com',
          password: 'password2',
          firstName: 'firstName1',
          lastName: 'lastName2'
        }
      }
    ];
    });
  }));

  var $scope;
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    $controller = $controller('BoardController', {
      $scope: $scope
    });
  }));

  describe('goToUser()', function(){
    it('Function defined', function(){
      $scope.goToUser.should.exist;
    });
  });

});
