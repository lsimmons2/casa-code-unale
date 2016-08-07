describe('ProfileController', function(){
	beforeEach(module('profCtrl'));
	beforeEach(inject(function(_$controller_){
		    $controller = _$controller_;
		}));
	it('Controller defined', function(){
		expect($controller).toBeDefined();
	    });
    });