var UserModel = require('../userModel.js');


function getUser(req, res, next){
	var profile = req.user;
	var linkStatus = {
		local: null,
		linkedin: null,
		github: null
	}
	if(profile.local.email){
		linkStatus.local = true;
	} else {
		linkStatus.local = false;
	}
	if(profile.social.linkedin.id){
		linkStatus.linkedin = true;
	} else {
		linkStatus.linkedin = false;
	}
	if(profile.social.github.id){
		linkStatus.github = true;
	} else {
		linkStatus.github = false;
	}
	return res.status(200).json({
		profile: profile,
		linkStatus: linkStatus
	});
};

function updateUser(req, res, next) {
  return UserModel.findOne({'username': req.user.username},
  function (err, user) {
    if(err) {
      return next(err);
    }
    if(user == null) {
      return res.status(404).json('User not found in the dBase');
    }
		user.local.photoURL = req.body.photoURL || user.local.photoURL;
    user.local.email = req.body.email || user.local.email;
		user.skillsTO = req.body.skillsTO || user.skillsTO;
		user.skillsTL = req.body.skillsTL || user.skillsTL;
		user.bio = req.body.bio || user.bio;
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
			 return res.json(user);
			 //return res.redirect('/app/#/home');
		});
	} else if (req.user.social.linkedin.email){
		console.log('yep, gotta delete user with their linkedin address');
		return UserModel.findOneAndRemove({'social.linkedin.email': req.user.social.linkedin.email}, function (err, user) {
			if(err) {
				 return next(err);
			 }
			 if(user == null) {
				 return res.status(404).json('User not found in the dBase');
			 }
			 console.log('success deleted user from db!!!');
			 //return res.redirect('/app/#/home');
			 return res.json(user);
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
			 return res.json(user);
		});
	}
}

function compProf(req, res, next){
	UserModel.findOne({'username': req.body.username}, function(err, user){
		if(err){
			console.log('Error finding user in complete profile');
			return next(err);
		}
		if(user){
			return res.status(409).json({
				message: "username already exists"
			});
		}
		if(req.user.social.linkedin.id){
			return UserModel.findOne({'social.linkedin.id': req.user.social.linkedin.id}, function(err, user){
				if(err){
					return next(err);
				}
				if(user == null){
					return res.status(404).json('User not found in the dBase');
				}
				user.username = req.body.username;
				user.local.photoURL = req.body.photoURL;
				user.skillsTO = req.body.skillsTO;
				user.skillsTL = req.body.skillsTL;
				user.bio = req.body.bio;
				user.save(function(err, user){
					if(err){
						console.log('Unable to save users completed profile');
						return next(err);
					}
					console.log('Skills, username, and bio added');
					return res.redirect(('/app/#/user/' + user.username));
				})
			})
		}
		return UserModel.findOne({'social.github.id': req.user.social.github.id}, function(err, user){
			if(err){
				return next(err);
			}
			if(user == null){
				return res.status(404).json('User not found in the dBase');
			}
			user.username = req.body.username;
			user.local.photoURL = req.body.photoURL;
			user.skillsTO = req.body.skillsTO;
			user.skillsTL = req.body.skillsTL;
			user.bio = req.body.bio;
			user.save(function(err, user){
				if(err){
					console.log('Unable to save users completed profile');
					return next(err);
				}
				return res.redirect(('/app/#/user/' + user.username));
			})
		})
	})
}

module.exports = {
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  compProf: compProf
}
