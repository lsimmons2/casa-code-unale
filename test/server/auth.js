var request = require('supertest');
var chai = require('chai');
var should = chai.should();
var app = require('../../server.js');



describe('GET /auth/login', function(){
  it('login works', function(done){
    request.agent(app)
      .post('/auth/login')
      .send({email: 'abe@gmail.com', password: 'sah'})
      .expect(200)
      .end(function(err, res){
        if(err) return done(err);
        should.exist(res.headers['set-cookie']);
        res.body.should.have.property('authenticated');
        done();
      });
  });
});
