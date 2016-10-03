var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../server');
chai.use(chaiHttp);

describe('/board', function(){
	it('res has 200 status', function(done){
		chai.request(server)
		.get('/users/users')
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('res is json, res.body is array', function(done){
		chai.request(server)
		.get('/app/board')
		.end(function(err, res){
			res.should.be.json;
			res.body.should.be.a('array');
			done();
		});
	});
	it('user has all properties', function(done){
		chai.request(server)
		.get('/app/board')
		.end(function(err, res){
			var user = res.body[0];
			user.should.have.property('firstName');
			user.should.have.property('lastName');
			user.should.have.property('username');
			user.should.have.property('email');
			user.should.have.property('bio');
			user.should.have.property('_id');
			user.should.have.property('skillsTL');
			user.should.have.property('skillsTO');
			done();
		});
	});
})


describe('/login', function(){
	it('res has 200 status', function(done){
		chai.request(server)
		.post('/auth/login')
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('res is json, res.body is json', function(done){
		chai.request(server)
		.post('/app/login')
		.end(function(err, res){
			res.should.be.json;
			res.body.should.be.a('object');
			done();
		});
	});
	it('body has \'message\' and \'authenticated\' properties', function(done){
		chai.request(server)
		.post('/app/login')
		.end(function(err, res){
			res.body.should.have.property('message');
			res.body.should.have.property('authenticated');
			done();
		});
	});
})


describe('/logout', function(){
	it('res has 200 status', function(done){
		chai.request(server)
		.get('/app/logout')
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('res redirects', function(done){
		chai.request(server)
		.get('/app/logout')
		.end(function(err, res){
			res.should.redirect;
			done();
		});
	});
	/*
	it('res redirects to \'/\'', function(done){
		chai.request(server)
		.get('/app/logout')
		.end(function(err, res){
			res.should.redirectTo('http://localhost/')
			done();
		});
	});
	*/
})


describe('/register', function(){
	it('res has 200 status if account info is included', function(done){
		var random = Math.random().toString();
		chai.request(server)
		.post('/app/register')
		.send({
			firstName: 'sah',
	    lastName: 'sah',
	    username: random,
	    email: random,
	    avatar: 'sah',
	    email: 'sah',
	    skillsTO: ['sah'],
	    skillsTL: ['sah'],
	    bio: 'sah',
			password: password
		})
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('res has 500 status if account isn\'t included', function(done){
		chai.request(server)
		.post('/app/register')
		.end(function(err, res){
			res.should.have.status(500);
			done();
		});
	});
})



describe('/status', function(){
	it('res has 200 status', function(done){
		chai.request(server)
		.get('/app/status')
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('res has authenticated boolean property', function(done){
		chai.request(server)
		.get('/app/status')
		.end(function(err, res){
			res.body.should.have.property('authenticated');
			res.body.authenticated.should.be.a('boolean');
			done();
		});
	});
})


describe('/users', function(){
	it('PUT res has 200 status if info included', function(done){
		chai.request(server)
		.put('/users/users')
		.send({
			firstName:'sah',
	    lastName:'sah',
	    email:'sah',
	    skillsTL:'sah',
	    skillsTO:'sah',
	    bio:'sah',
			username: 'sah'
		})
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('PUT res has 500 status if info isn\'t included', function(done){
		chai.request(server)
		.put('/users/users')
		.end(function(err, res){
			res.should.have.status(500);
			done();
		});
	});
	it('res body has string message property', function(done){
		chai.request(server)
		.put('/users/users')
		.end(function(err, res){
			res.body.should.have.property('message');
			res.body.message.should.be.a('string')
			done();
		});
	});
})
