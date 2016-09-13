describe('myServ', function(){
	var AuthService;
	beforeEach(module('myServ'));
	beforeEach(inject(function(_AuthService_){
		    AuthService = _AuthService_;
		}));
	it('Service exists', function(){
		AuthService.should.exist;
	    });
	describe('isLoggedIn()', function(){
		it('Function defined', function(){
			AuthService.isLoggedIn.should.exist;
		    });
		it('Returns boolean', function(){
			//myServ.isLoggedIn()==true || myServ.isLoggedIn()==false).toBeTruthy();
		    });

	    });
	describe('getUserStatus()', function(){
		it('Function defined', function(){
			//myServ.getUserStatus.should.exist;
		    });
	    });
	describe('login()', function(){
		it('Function defined', function(){
			//myServ.login.should.exist;
		    });
	    });
	describe('logout()', function(){
		it('Function defined', function(){
			//myServ.logout.should.exist;
		    });
	    });
    });
