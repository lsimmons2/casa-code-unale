var UserModel = require('./userModel.js');


function isLoggedIn(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}
	res.redirect('/app/#/login')
}


function findUser(req, res, next) {
  return UserModel.findOne({'email': req.user.email},
    function (err, user) {
      if(err) {
        return next(err);
      }
      if(user == null) {
        console.log('No user');
        return res.status(404).json({'message':'User does not exist in the dBase'});
      }
			console.log('user from findUser(): ', user);
      return res.status(200).json(user);
  });
}

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

function updateUser(req, res, next) {
  return UserModel.findOne({'email': req.params.email}, 'email username password',
  function (err, user) {
    if(err) {
      return next(err);
    }
    if(user == null) {
      return res.status(404).json('User not found in the dBase');
    }
    user.email = req.body.email || user.email;
    user.username = req.body.username || user.username;
    user.password = user.generateHash(req.body.password) || user.password;
    user.save(function (err, user) {
      if(err) {
        return next(err);
      }
      return res.json(user);
    });
  });
}

function deleteUser(req, res, next) {
	console.log('api deleteUser() activated', req.user);
	//better if this searches for a email as param, is it more fool-proof that way?
	if(req.user.local.email){
		console.log('req.user', req.user);
		console.log('yep the user has a local email');
		return UserModel.findOneAndRemove({'local.email': req.user.local.email}, function (err, user) {
			if(err) {
				console.log('error deleting user from db: ', err);
				 return next(err);
			 }
			 if(user == null) {
				 console.log('can\'t delete user b/c they\'re not in the db!!!!!');
				 return res.status(404).json('User not found in the dBase');
			 }
			 console.log('success deleted user from db!!!');
			 return res.json({user});
			 //return res.redirect('/app/#/home');
		});
	} else if (req.user.social.linkedin.email){
		console.log('yep, gotta delete user with their linkedin address');
		return UserModel.findOneAndRemove({'social.linkedin.id': req.user.social.linkedin.id}, function (err, user) {
			if(err) {
				 return next(err);
			 }
			 if(user == null) {
				 return res.status(404).json('User not found in the dBase');
			 }
			 console.log('success deleted user from db!!!');
			 //return res.redirect('/app/#/home');
			 return res.json({user});
		});
	}
	else {
		console.log('yep, gotta delete user with their github address');
		return UserModel.findOneAndRemove({'social.github.id': req.user.social.github.id}, function (err, user) {
			if(err) {
				 return next(err);
			 }
			 if(user == null) {
				 return res.status(404).json('User not found in the dBase');
			 }
			 console.log('success deleted user from db!!!');
			 //return res.redirect('/app/#/home');
			 return res.json({user});
		});
	}
}

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
				console.log('Unable to disconnect user\'s linkedin account');
				return next(err);
			}
			return res.redirect('/app/#/profile');
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
		user.social.github.username = null;
		user.social.github.token = null;
		user.social.github.displayName = null;
		user.social.github.profileURL = null;
		user.social.github.email = null;
		user.social.github.photoURL = null;
		user.save(function(err, user){
			if(err){
				console.log('Unable to disconnect user\'s linkedin account');
				return next(err);
			}
			return res.redirect('/app/#/profile');
		})
	})
}

//==============================================================================
/**
* Export module
*/
module.exports = {
  isLoggedIn: isLoggedIn,
  findUser: findUser,
  viewAllUsers: viewAllUsers,
  updateUser: updateUser,
  deleteUser: deleteUser,
	disconnectLinkedin: disconnectLinkedin,
	disconnectGithub: disconnectGithub
};
