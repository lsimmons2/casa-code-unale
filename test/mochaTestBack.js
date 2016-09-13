var chai = require('chai');
var assert = chai.assert;
//var request = chai.request();
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server');
chai.use(chaiHttp);


/*describe('test test', function(){
	it('A=A?', function(){
		assert.equal('A', 'A');
	    });
    });*/


describe('API', function(){
	it('/board', function(done){
		chai.request(server)
		    .get('/board')
		    .end(function(err, res){
			    res.should.have.status(200);
			    res.should.be.json;
			    res.body.should.be.a('array');
			    done();
			});
	    });
	it('/login', function(done){
		chai.request(server)
		    .post('/login')
		    .end(function(err, res){
			    res.should.have.status(200);
			    res.should.be.json;
			    res.should.be.a('object');
			    done();
			});
	    });
	it('/logout', function(done){
		chai.request(server)
		    .get('/logout')
		    .end(function(err, res){
			    res.should.have.status(200);
			    res.body.should.be.a('object');
			    done();
			});
	    });
	it('/register', function(done){
		chai.request(server)
		    .post('/register')
		    .end(function(err, res){
			    res.should.have.status(500);
			    res.should.be.json;
			    res.should.be.a('object');
			    done();
			});
	    });
	it('/status', function(done){
		chai.request(server)
		    .get('/status')
		    .end(function(err, res){
			    res.should.have.status(200);
			    res.body.should.be.a('object');
			    done();
			});
	    });
    });
