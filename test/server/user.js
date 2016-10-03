var request = require('supertest');
var chai = require('chai');
var should = chai.should();
var app = require('../../server.js');


describe('GET /user', function(){

  var agent = request.agent(app);

  it('login', function(done){
    agent
      .post('/auth/login')
      .send({email: 'abe@gmail.com', password: 'sah'})
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        should.exist(res.headers['set-cookie']);
        res.body.should.have.property('authenticated');
        done();
      });
  })


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
