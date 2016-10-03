var chai = require('chai');
var should = chai.should();
var chaiHttp = require('chai-http');
var server = require('../../server');
chai.use(chaiHttp);

describe('viewAllUsers()', function(){
  it('res.body is array', function(done){
    chai.request(server)
    .get('/app/board')
    .end(function(err, res){
      console.log('res.body', res.body);
      res.body.should.be.an('array');
      done();
    })
  })
  it('array element is user object', function(done){
    chai.request(server)
    .get('/app/board')
    .end(function(err, res){
      var user = res.body[0];
      user.should.have.property('username');
      user.should.have.property('skillsTL').that.is.an('array');
      user.should.have.property('skillsTO').that.is.an('array');
      done();
    })
  })
})
