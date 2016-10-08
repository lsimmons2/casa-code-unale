var request = require('supertest');
var chai = require('chai');
var should = chai.should();


var app = require('../../server.js');
var config = require('../../server/config/config.js');
var UserModel = require('../../server/userModel.js');
var agent = request.agent(app);


beforeEach(function(done){

  agent
    .post('/auth/signup')
    .send(config.testData.signUpData)
    .expect(200)
    .end(function(err, res){
      if(err) return done(err);
      should.exist(res.headers['set-cookie']);
      done();
    });

});


afterEach(function(done){

  UserModel.remove(function(){
    done();
  });

});


describe('GET /user', function(){

  it('returns user', function(done){
    agent
      .get('/user')
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        var profile = res.body.profile;
        var linkStatus = res.body.linkStatus;
        should.exist(profile);
        should.exist(linkStatus);
        linkStatus.should.have.property('local');
        linkStatus.should.have.property('linkedin');
        linkStatus.should.have.property('github');
        console.log('profile: ', profile);
        profile.should.have.property('username');
        profile.should.have.property('skillsTO');
        profile.should.have.property('skillsTL');
        done();
      });
  });

});


describe('PUT /user', function(){

  it('returns user', function(done){
    agent
      .get('/user')
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        var profile = res.body.profile;
        var linkStatus = res.body.linkStatus;
        should.exist(profile);
        should.exist(linkStatus);
        linkStatus.should.have.property('local');
        linkStatus.should.have.property('linkedin');
        linkStatus.should.have.property('github');
        profile.should.have.property('username');
        profile.should.have.property('skillsTO');
        profile.should.have.property('skillsTL');
        done();
      });
  });

});
