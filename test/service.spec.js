describe('AuthService=====================', function(){
	var Auth;
	beforeEach(module('myServ'));
	beforeEach(inject(function(_AuthService_){
		    AuthService = _AuthService_;  
		}));
	it('Service exists', function(){
		expect(AuthService).toBeDefined();
	    });
	describe('isLoggedIn()', function(){
		it('Function defined', function(){
			expect(AuthService.isLoggedIn).toBeDefined();
		    });
		it('Returns boolean', function(){
			expect(AuthService.isLoggedIn()==true || AuthService.isLoggedIn()==false).toBeTruthy();
		    });
	    
	    });
	describe('getUserStatus()', function(){
		it('Function defined', function(){
			expect(AuthService.getUserStatus).toBeDefined();
		    });
	    });
	describe('login()', function(){
		it('Function defined', function(){
			expect(AuthService.login).toBeDefined();
		    });
	    });
	describe('logout()', function(){
		it('Function defined', function(){
			expect(AuthService.logout).toBeDefined();
		    });
	    });
	describe('stackCaller()', function(){
		it('Function defined', function(){
			expect(AuthService.stackCaller).toBeDefined();
		    });
	    });
    });