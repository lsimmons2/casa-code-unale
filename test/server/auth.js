var request = require('supertest');
var chai = require('chai');
var mongoose = require('mongoose');
var should = chai.should();

var app = require('../../server.js');
var config = require('../../server/config/config.js');
var UserModel = require('../../server/userModel.js');
var user;


describe('GET /auth/signup', function(){

  before(function(done){
    UserModel.remove(function(){
      user = config.testData.signUpData;
      done();
    });
  });

  after(function(done){
    UserModel.remove(function(){
      done();
    });
  });

  it('signup works', function(done){
    request.agent(app)
      .post('/auth/signup')
      .send(user)
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        should.exist(res.headers['set-cookie']);
        done();
      })
  })

});


describe('GET /auth/login', function(){

  before(function(done){
    user = config.testData.signUpData;
    request.agent(app)
      .post('/auth/signup')
      .send(user)
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        done();
      })
  });

  after(function(done){
    UserModel.remove(function(){
      done();
    });
  });

  it('login works', function(done){
    request.agent(app)
      .post('/auth/login')
      .send({email: 'abe@gmail.com', password: 'abeismyname'})
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        should.exist(res.headers['set-cookie']);
        res.body.should.have.property('authenticated');
        done();
      });
  });

});
