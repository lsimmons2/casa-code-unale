var express = require('express');
var passport = require('./passport.js');
var controller = require('./controller.js');
var mailCtrl = require('./mailController.js');

var router = express.Router();

var isLoggedIn = controller.isLoggedIn;
var findUser = controller.findUser;
var viewAllUsers = controller.viewAllUsers;
var updateUser = controller.updateUser;
var deleteUser = controller.deleteUser;
var compProf = controller.compProf;
var imageUpload = controller.imageUpload;



router.use(passport.initialize());
router.use(passport.session());


router.post('/signature', function(req, res, next){
  return imageUpload(req, res, next);
})

router.get('/resetPass', function(req, res, next){
  return mailCtrl.resetPass(req, res, next);
})

router.get('/status', function(req, res){
  if (!req.isAuthenticated()) {//is authenticated if in session
		console.log('User is not authenticated back here on the server');
    return res.status(200).json({
      authenticated: false
    });
  }
  if(req.user.skillsTO.length > 0 && req.user.skillsTL.length > 0){
    var hasSkills = true;
  } else {
    var hasSkills = false;
  }
  console.log('User is authenticated back here on the server');
  res.status(200).json({
    authenticated: true,
    hasSkills: hasSkills,
    username: req.user.username
  });
});


router.route('/user')
  .put(function (req, res, next) {
    return updateUser(req, res, next);
  })
  .delete(function (req, res, next) {
    return deleteUser(req, res, next);
  });

router.get('/user/:username', function(req, res, next){
  return findUser(req, res, next);
});

router.get('/profile', isLoggedIn, function (req, res, next) {
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
});

router.get('/board', function(req, res, next){
  return viewAllUsers(req, res, next);
});


//Authorization==============================================
router.route('/signup')
.post(function(req, res, next) {
	passport.authenticate('local-signup', function(err, user, info){
		if(err){
			return next(err);
		}
		if(!user){//user was already found in the db and therefore shouldn't be signing up
			return res.status(409).json({message: info.errMsg})
		}
		//user has been created, log them in
		req.login(user, function(err){
			if(err){
				console.log('Error logging in user after registering: ', err);
				return next(err);
			}
			return res.status(200).json({
				message: 'User logged in after signing up locally'
			});
		});
	})(req, res, next);
});

router.route('/login')
.post(function(req, res, next){
  passport.authenticate('local-login', function(err, user, info) {
    console.log('info: ', info);
    if (err) {//error checking if user is authenticated with passport
      console.log('error handling passport local-login callback');
      return next(err);//500 status code
    }
    if (!user) {//user cannot be authenticated by passport
      console.log('user not found in local-login ', info.errMsg);
      return res.status(409).json({
        message: 'invalid combo',
        authenticated: false
      });
      //res.end();
    }
    console.log('trying hereee please');
    req.logIn(user, function(err) {//user is authenticated, record session
      console.log('tryinnng here');
      if (err) {
				console.log('Error logging in user locally: ', err);
        return next(err);
      }
      console.log('no error then?');
      return res.status(200).json({//maybe use 302 and redirect
        message: 'Logged in successfully',
        authenticated: true
      });
    });
  })(req, res, next);
});

router.get('/auth/github', passport.authenticate('github'));

router.get('/auth/github/callback', passport.authenticate('github', {
  failureRedirect : '/app/#/login'
}), function(req, res){
	res.redirect('/app/#/settings');
});

function mid(){
  console.log('sahhh from mid');
}
router.get('/auth/linkedin', passport.authenticate('linkedin'));

router.get('/auth/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect : '/app/#/login'
}), function(req, res){
	res.redirect('/app/#/settings');
});


router.post('/compProf', function(req, res, next) {
  return compProf(req, res, next);
});

//should make this delete verb of /connect/linkedin route
router.get('/disconnect/linkedin', function(req, res, next){
  return controller.disconnectLinkedin(req, res, next);
});

router.get('/disconnect/github', function(req, res, next){
  return controller.disconnectGithub(req, res, next);
});


router.route('/logout')
.get(function(req, res){
  req.logout();
	req.session.destroy();
  res.redirect('/app/#/login');
});



module.exports = router;
