var UserModel = require('../userModel.js');
var request = require('request');

function findUser(req, res, next){
	return UserModel.findOne({'username': req.params.username}, function(err, user){
		if(err){
			console.log('Error making db query: ', err);
			return next(err);
		}
		if(user == null){
			console.log('No user found in db');
			return res.status(404).json({'message': 'User not in db'});
		}
		if(user.social.github.token){
			//these two if()'s should be one line
			if(req.user){
				if(req.user.social.github.token){
					var token = 'token ' + req.user.social.github.token;
					var url = 'https://api.github.com/users/' + user.social.github.username + '/repos';
					var githubReq = {
						url: url,
						headers: {
							'User-Agent': 'request',
							'Authorization': token
						}
					}
					return request(githubReq, function(error, response, body){
						if(error){
              console.log('Error making req for repos');
							return next(error);
						}
						var repos = JSON.parse(body);
						return res.status(200).json({
							user: user,
							repos: repos
						});
					});
				}
				return res.status(200).json({
					user: user,
					repos: 'unAuth'
				});
			}
		}
		return res.status(200).json({
			user: user
		});
	});
};

function viewAllUsers(req, res, next) {
  return UserModel.find({},
  function (err, users) {
    if(err) {
      return next(err);
    }
    if(users == null) {
      return res.status(404).json('No users in the dBase');
    }
    return res.json(users);
  });
}

module.exports = {
  findUser: findUser,
  viewAllUsers: viewAllUsers
}
