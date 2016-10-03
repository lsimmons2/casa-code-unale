describe('authService', function(){

  var AuthService;

  beforeEach(module('authService'));

  beforeEach(inject(function(_AuthService_){
    AuthService = _AuthService_;
  }));

  it('Service exists', function(){
    AuthService.should.exist;
  });

  describe('getUserStatus()', function(){
    it('Function defined', function(){
      AuthService.getUserStatus.should.exist;
    });
  });

  describe('login()', function(){
    it('Function defined', function(){
      AuthService.login.should.exist;
    });
  });

  describe('logout()', function(){
    it('Function defined', function(){
      AuthService.logout.should.exist;
    });
  });

});
