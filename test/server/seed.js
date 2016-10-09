var app = require('../../server.js');
var request = require('supertest');
var agent = request.agent(app);

var UserModel = require('../../server/userModel.js');

module.exports = function seed(done){
  UserModel.remove(function(){
      for (var i = 0; i < 10; i++){
        var user = new UserModel({
          username: 'username' + i,
          skillsTO: ['python', 'django'],
          skillsTL: ['javascript', 'node.js', 'express'],
          local: {
            email: 'user' + i + '@email.com',
            password: 'password' + i,
            firstName: 'firstName' + i,
            lastName: 'lastName' + i
          }
        });
        user.save(function(err){
          if (err){
            return console.log('err: ', err);
          }
        })
      }
      done();
    })
}
