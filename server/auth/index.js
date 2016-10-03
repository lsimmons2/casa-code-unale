var express = require('express');
var ctrl = require('./controller.js');
var passport = require('./passport.js');


var router = express.Router();
router.use(passport.initialize());
router.use(passport.session());

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

router.get('/github', passport.authenticate('github'));

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect : '/app/#/login'
}), function(req, res){
	res.redirect('/app/#/settings');
});

router.get('/linkedin', passport.authenticate('linkedin'));

router.get('/linkedin/callback', passport.authenticate('linkedin', {
  failureRedirect : '/app/#/login'
}), function(req, res){
	res.redirect('/app/#/settings');
});

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
  var incomplete = false;
  if(!req.user.skillsTO.length > 0 || !req.user.skillsTL.length > 0 || !req.user.local.email && !req.user.social.github.email && !req.user.social.linkedin.emal){
    incomplete = true;
  }
  console.log('User is authenticated back here on the server');
  res.status(200).json({
    authenticated: true,
    incomplete: incomplete,
    username: req.user.username
  });
});

module.exports = router;
