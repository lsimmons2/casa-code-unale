var request = require('supertest');
var chai = require('chai');
var should = chai.should();


var app = require('../../server.js');
var config = require('../../server/config/config.js');
var UserModel = require('../../server/userModel.js');
var agent = request.agent(app);
var seed = require('./seed.js');


before(function(done){
  seed(done);
});

after(function(done){
  UserModel.remove(function(){
    done();
  });
});




describe('GET /users', function(){

  it('returns array of users', function(done){
    agent
      .get('/users')
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        res.body.should.be.an('array');
        done();
      });
  });

  it('array element is user', function(done){
    agent
      .get('/users')
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        var user = res.body[0];
        user.should.have.property('username');
        user.should.have.property('skillsTO');
        user.should.have.property('skillsTL');
        done();
      });
  });

});
