var UserModel = require('../userModel.js');
var request = require('request');


function disconnectLinkedin(req, res, next){
	return UserModel.findOne({'local.email': req.user.local.email}, 'social.linkedin', function(err, user){
		if(err){
			return next(err);
		}
		if(user == null){
			return res.status(404).json('User not found in the dBase');
		}
		user.social.linkedin.id = null;
		user.social.linkedin.token = null;
		user.social.linkedin.tokenSecret = null;
		user.social.linkedin.firstName = null;
		user.social.linkedin.lastName = null;
		user.social.linkedin.email = null;
		user.social.linkedin.summary = null;
		user.social.linkedin.photoURL = null;
		user.save(function(err, user){
			if(err){
				console.error('Unable to disconnect user\'s linkedin account');
				return next(err);
			}
			return res.redirect('/app/#/settings');
		})
	})
}


function disconnectGithub(req, res, next){
	return UserModel.findOne({'local.email': req.user.local.email}, 'social.github', function(err, user){
		if(err){
			return next(err);
		}
		if(user == null){
			return res.status(404).json('User not found in the dBase');
		}
		user.social.github.id = null;
		user.social.github.token = null;
		user.social.github.username = null;
		user.social.github.displayName = null;
		user.social.github.profileURL = null;
		user.social.github.email = null;
		user.social.github.photoURL = null;
		user.save(function(err, user){
			if(err){
				console.error('Unable to disconnect user\'s linkedin account: ', err);
				return next(err);
			}
			return res.redirect('/app/#/settings');
		})
	})
}

module.exports = {
  disconnectLinkedin: disconnectLinkedin,
  disconnectGithub: disconnectGithub
}
