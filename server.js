//modules
//================================================================================================
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var request = require('request');
var cors = require('cors');
var path = require('path');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;
var flash = require('connect-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var expressSession      = require('express-session');
var connect = require('connect');
var passportLocalMongoose = require('passport-local-mongoose');

//configuration
//================================================================================================
//var port = process.env.PORT || 8080;
var uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri);


app.use(express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser())
//app.use(session({ secret: 'scotch', resave: true, saveUninitialized: true})); // session secret
//REDUNDANT - HAVE ALREADY INITIALIZDE EXPRESS-SESSION?
app.use(require('express-session')({
	    secret: 'mysecret',
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
var basicRouter = express.Router();
basicRouter.use(function(req, res, next){
	console.log(req.method, req.url);
	next();
});


app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
    });


app.get('/welcome', function(req, res){
	res.redirect('/welcome');
    });


basicRouter.get('/', function(req, res){
	res.json({message: 'welcome to the api'});
});


basicRouter.route('/login')
/*get(function(req, res){
	//res.redirect('/login')
	console.log('/login GET works');
	})*/
    .post(function(req, res, next){
	    passport.authenticate('local', function(err, user, info) {
		    if (err) {
			console.log('error authenticating user');
			return next(err);
		    }
		    if (!user) {
			console.log('user not in db');
			return res.redirect('/login');
		    }
		    req.logIn(user, function(err) {
			    console.log('reached last step of authenticate');
			    if (err) {
				console.log('err in logIn()');
				return next(err);
			    }
			    console.log('no error in logIn()');
			    return res.status(200).json({
				    status: 'Registration successful!'
					});
			});
		})(req, res, next);
	});


basicRouter.route('/board')
	.get(function(req, res){
		Account.find(function(error, users){
			if(error){
				console.log('There was an error receiving the board get request');
				res.send('There was an error with the board get request');
			}
			else{
				console.log('Request recieved successfuly by Express');
				res.json(users);
			}
			//console.log(users);
			//res.send('here\'s the data!\n' + users);
			//res.json(users);
		});
	});


basicRouter.route('/register')
/*.get(function(req, res){
	    console.log('/register GET received from backend');
	    })*/
    .post(function(req, res) {
	    console.log(req.body);
	    Account.register(new Account({ firstName: req.body.firstName,  lastName: req.body.lastName,  username: req.body.username,  email: req.body.email, avatar: req.body.avatar,  email: req.body.email,  skillsTO: req.body.skillsTO,  skillsTL: req.body.skillsTL, bio: req.body.bio }),
			  req.body.password, function(err, account) {
		    if (err) {
			console.log('error in register() in /register POST: ');
			console.log(err);
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


app.get('/status', function(req, res) {
	//	console.log(req);
	if (!req.isAuthenticated()) {
	    return res.status(200).json({
		    status: false
			});
	}
	res.status(200).json({
		status: true
		    });
    });


basicRouter.route('/users')
	.get(function(req, res){
		console.log(req.user);
		Account.findOne({username: req.user.username}, function(error, user){
			if(error){
			    console.log(error);
			    res.send(error);
			}
			else{
			    console.log('user sent: ' + user);
			    res.json(user);
			}
		    });
		/*User.find(function(error, users){
			if(error){
				res.send(error);
			}
			res.json(users);
			});*/
	    })
	.put(function(req, res){
		//console.log(req.body);
		Account.findOneAndUpdate({username: req.user.username}, {$set:{
			firstName:req.body.firstName,
			lastName:req.body.lastName,
			email:req.body.email,
			skillsTL:req.body.skillsTL,
			skillsTO:req.body.skillsTO,
			bio:req.body.bio
		}}, {new: true}, function(err, doc){
			if(err){
				console.log('Couldn\'t update: ' + err);
			}
			console.log('worked?');
			console.log(doc);
		})
		//console.log(req.user);
		//console.log(req.body)
	});


	    
basicRouter.route('/users/:user_id')
	.get(function(req, res){
		User.findById(req.params.user_id, function(error, user){
			if (error){
				res.send(error);
			}
			else{
				res.json(user);
			}
		});
	})
/*.put(function(req, res){
		User.findById(req.params.user_id, function(error, user){
			if(error){
				res.send(error);
			}
			else{
				user.firstName='King Leo';
				user.save(function(error){
					if(error){
						res.send(error);
					}
					else{
						res.json({message: 'User updated'});
					}
				});
			}
		});
	})*/
/*.delete(function(req, res){
		User.remove({
			_id: req.params.user_id
		}, function(error, bear){
			if(error)
				res.send(error)
			res.json({message: 'user successfully deleted'});
		});
	});*/

app.use('/', basicRouter);


//start app
//================================================================================================
//app.listen(port);
//console.log('App connected to port ' + port);

app.listen(3000, function(){
	console.log('App running on port 3000');
})


//WHY DO YOU NEED 'exports ='
exports = module.exports = app;
