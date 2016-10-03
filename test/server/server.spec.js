var request = require('supertest');
var chai = require('chai');
var should = chai.should();

var app = require('../../server.js');


describe('GET /app/login', function(){
  it('login works', function(done){
    request.agent(app)
      .post('/app/login')
      .send({email: 'abe@gmail.com', password: 'sah'})
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        console.log('res.headers: ', res.headers);
        should.exist(res.headers['set-cookie']);
        res.body.should.have.property('authenticated');
        done();
      });
  });
});

describe('GET /board authenticated', function(){
  var agent = request.agent(app);
  agent
    .post('/app/login')
    .send({email: 'abe@gmail.com', password: 'sah'})
    .expect(200)
    .end(function(err, res){
      agent
        .get('/app/user/abe')
        .expect(200)
        .end(function(err, res){
          console.log('res.body: ', res.body);
          done();
        })
    })
});


describe('GET /app/board', function(){

  it('return array of users if unauthenticated', function(done){
    var agent = request.agent(app);
    agent
      .get('/app/board')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        res.body.should.be.a('array');
        var user = res.body[0];
  			user.should.have.property('username');
  			user.should.have.property('_id');
  			user.should.have.property('skillsTL');
  			user.should.have.property('skillsTO');
        done();
      });
  });

  it('return ')

});



  /*it('should return array of users and repos if authenticated', function(done){
    agent
      .get('/app/board')
      .expect(200)
      .end(function(err, res){
        if (err) return done(err);
        console.log('res.body: ', res.body);
        res.body.should.be.a('object');
        done();
      });
  });*/

/*
var request = require('supertest');
var server = require('../../server.js');
var chai = require('chai');

var should = chai.should();

describe('/board', function(){
	it('res has 200 status', function(done){
		request(server)
		.get('/app/board')
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('res.body is array', function(done){
		request(server)
		.get('/app/board')
		.end(function(err, res){
      res.should.have.status(200);
			done();
		});
	});
});
*/
/*describe('when user not logged in', function() {
  describe('POST /app/login', function() {
    var agent = supertest.agent(app);
    agent
    .post('http://127.0.0.1:8080/app/login')
    //.set('Accept', 'application/json')
    .send({email: 'leooscar.simmons@gmail.com', password: 'sah'})
    .end(function(err, res) {
      console.log('res.body', res.body);
      //should.not.exist(err);
      //res.should.have.status(401);
      //should.exist(res.headers['set-cookie']);
      done();
    });
  });
});*/
/*
describe('POST /app/login', function(){
  it('login', loginUser());
  it('uri blah', function(done){
    server
      .post('/app/login')
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err);
        }
        console.log(res.body);
        done();
      })
  })
});

*/
/*
describe('/board', function(){
	it('res has 200 status', function(done){
		chai.request(server)
		.get('/app/board')
		.end(function(err, res){
			res.should.have.status(200);
			done();
		});
	});
	it('res.body is array', function(done){
		chai.request(server)
		.get('/app/board')
		.end(function(err, res){
			res.body.should.be.a('array');
			done();
		});
	});
	it('user has all properties', function(done){
		chai.request(server)
		.get('/app/board')
		.end(function(err, res){
			var user = res.body[0];
      console.log('user', user);
			user.should.have.property('username');
			user.should.have.property('_id');
			user.should.have.property('skillsTL');
			user.should.have.property('skillsTO');
			done();
		});
	});
});

describe('/user unauth', function(){
  it('res.body is user object', function(done){
    chai.request(server)
    .get('/app/user/abe')
    .end(function(err, res){
      res.body.should.have.property('user');
      var user = res.body.user;
      user.should.be.an('object');
      user.should.have.property('')
    });
  });
});
*/
