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

function getIncompleteProf(req, res, next){
  var profile = req.user;
  var missing = {};

  if(!profile.username){
    missing.username = true;
  }
  if(!profile.bio){
    missing.bio = true;
  }
  if(!profile.local.email && !profile.social.linkedin.email && !profile.social.github.email){
    missing.email = true;
  }
  if(!profile.skillsTO.length > 0 || !profile.skillsTL.length > 0){
    missing.skills = true;
  }
  if(!profile.local.photoURL && !profile.social.linkedin.photoURL && !profile.social.github.photoURL){
    missing.photo = true;
  }
  return res.status(200).json({
    profile: profile,
    missing: missing
  })
}

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
	if(req.user.local.email){
		return UserModel.findOneAndRemove({'local.email': req.user.local.email}, function (err, user) {
			if(err) {
				console.errpr('Error deleting user from db: ', err);
				 return next(err);
			 }
			 if(user == null) {
				 console.log('User doesn\'t exist in db');
				 return res.status(404).json('User not found in the dBase');
			 }
			 return res.json(user);
		});
	} else if (req.user.social.linkedin.email){
		return UserModel.findOneAndRemove({'social.linkedin.email': req.user.social.linkedin.email}, function (err, user) {
			if(err) {
				 return next(err);
			 }
			 if(user == null) {
				 return res.status(404).json('User not found in the dBase');
			 }
			 return res.json(user);
		});
	}
	else {
		return UserModel.findOneAndRemove({'social.github.id': req.user.social.github.id}, function (err, user) {
			if(err) {
				 return next(err);
			 }
			 if(user == null) {
				 return res.status(404).json('User not found in the dBase');
			 }
			 return res.json(user);
		});
	}
}

function compProf(req, res, next){
	UserModel.findOne({'username': req.body.username}, function(err, user){
		if(err){
			console.error('Error finding user in complete profile: ', err);
			return next(err);
		}
		if(user){
      console.log('User already exists: ', user);
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
        user.local.email = req.body.email;
				user.skillsTO = req.body.skillsTO;
				user.skillsTL = req.body.skillsTL;
				user.bio = req.body.bio;
				user.save(function(err, user){
					if(err){
						console.error('Unable to save users completed profile');
						return next(err);
					}
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
					console.error('Unable to save users completed profile');
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
  compProf: compProf,
  getIncompleteProf: getIncompleteProf
}
