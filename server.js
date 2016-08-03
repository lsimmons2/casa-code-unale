//moduless
//===============================================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var connect = require('connect');

//configuration
//================================================================================================
var port = process.env.PORT || 80;
var uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri);


app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
//REDUNDANT - HAVE ALREADY INITIALIZDE EXPRESS-SESSION?
app.use(require('express-session')({
	    secret: 'fakesecret',
		resave: false,
		saveUninitialized: false
		}));
app.use(passport.initialize());
app.use(passport.session());


var Account = require('./app/userModel');
passport.use(new localStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


//routes
//================================================================================================
var router = express.Router();
app.use('/', router);

//Don't cache anything returned from server
router.use(function(req, res, next){
        res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
        res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
        res.setHeader("Expires", "0");
	next();
});

router.route('/board')
	.get(function(req, res){
		Account.find(function(error, users){
			if(error){
			    res.send('There was an error with the board get request');
			}
			else{
				res.json(users);
			}
		});
	});

router.route('/login')
    .post(function(req, res, next){
	    passport.authenticate('local', function(err, user, info) {
		    if (err) {
			return next(err);
		    }
		    else if (!user) {
			//console.log('user not in db');
			res.json({message: 'This combination of user and password does not exist'});
			res.end();
			//return res.redirect('/login');
		    }
		else {
		    req.logIn(user, function(err) {
			    if (err) {
				return next(err);
			    }
			    return res.status(200).json({
				    status: 'Registration successful!'
					});
			});
		    }
		})(req, res, next);
	});

router.route('/logout')
	.get(function(req, res){
	    req.logout();
	    res.redirect('/');
	});

router.route('/register')
    .post(function(req, res) {
	    Account.register(new Account({
			firstName: req.body.firstName,
			    lastName: req.body.lastName,
			    username: req.body.username,
			    email: req.body.email,
			    avatar: req.body.avatar,
			    email: req.body.email,
			    skillsTO: req.body.skillsTO,
			    skillsTL: req.body.skillsTL,
			    bio: req.body.bio
			    }),
		req.body.password, function(err, account) {
		    if (err) {
			return res.status(500).json({
				err: err
				    });
		    }
		    passport.authenticate('local')(req, res, function () {
			    return res.status(200).json({
				    status: 'Registration successful!'
					});
			});
		});
	});

router.get('/status', function(req, res){
	if (!req.isAuthenticated()) {
	    return res.status(200).json({
		    status: false
			});
	}
	res.status(200).json({
		status: true
		    });
   
});

router.get('/welcome', function(req, res){
    res.redirect('/welcome');
});




//start app
//=================================================================================================

app.listen(port);
console.log('listening on port ' + port);

exports = module.exports = app;
