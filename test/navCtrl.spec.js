describe('NavController', function(){
	beforeEach(module('navCtrl'));
	beforeEach(inject(function(_$controller_){
		    $controller = _$controller_;
		}));
	it('Controller defined', function(){
		expect($controller).toBeDefined();
	    });
    });