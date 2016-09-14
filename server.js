//moduless
//===============================================================
//sahh
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
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

//configuration
//=============================================================
//sahh
var port = process.env.PORT || 80;
var uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri);

var emailer = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  auth: {
    user: 'leooscar.simmons@gmail.com',
    pass: 'xxxxxx'
  }
}));

app.use('/', express.static('./site/'));
app.use('/app', express.static('./'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());
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
//==========================================================================

app.route('/message')
.get(function(req, res){
  res.send('Woops! Seems like you sent a GET request, please make sure you send a POST request.  ');
})
.post(function(req, res){
  var firstAtt = req.body[Object.keys(req.body)[0]];
  if(firstAtt == undefined){
    res.send('Woops! Looks like the body in your request is empty. Please make sure you attach a JSON body with "name", "contact", and "message" properties.  ');
  }
  if(req.body.name == undefined){
    res.send('Woops! Looks like there\'s no "name" property in your JSON. Please make sure your JSON has "name", "contact", and "message" properties.  ');
  }
  if(req.body.contact == undefined){
    res.send('Woops! Looks like there\'s no "contact" property in your JSON. Please make sure your JSON has "name", "contact", and "message" properties.  ');
  }
  if(req.body.message == undefined){
    res.send('Woops! Looks like there\'s no "message" property in your JSON. Please make sure your JSON has "name", "contact", and "message" properties.  ');
  }
  else{
    var emailMessage = 'From: ' + req.body.name + '. Contact: ' + req.body.contact + '. Message: ' + req.body.message;
    console.log(emailMessage);
    var mail = {
      from: 'Your API',
      to: 'leooscar.simmons@gmail.com',
      subject: 'Someone has contacted you through your API',
      text: emailMessage
    };
    emailer.sendMail(mail, function(err, data){
    if(err){
      console.log(err);
      res.send('Sorry! Something went wrong in emailing your request to me. Please write me an email at leooscar.simmons@gmail.com. Thanks, Leo  ');
      return;
    }
    console.log('Message sent: ' + data.response);
    res.send("Thanks for reaching out! I'll get back to you as soon as I can. -Leo  ");
    });
  }
});



var router = express.Router();


//Don't cache anything returned from server
router.use(function(req, res, next){
  //console.log(req.method, req.url);
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // for http 1.1.
  res.setHeader("Pragma", "no-cache"); // for http 1.0.
  res.setHeader("Expires", "0");
  next();
});

router.route('/test')
.get(function(req, res){
  //console.log('req.headers: ', req.headers);
  console.log(req);
  res.send('tested');
});


router.route('/board')
.get(function(req, res){
  Account.find(function(error, users){
    if(error){
      res.send('There was an error with the board get request');
    }
    else{
      res.send(users);
    }
  });
});

router.route('/login')
.post(function(req, res, next){
  passport.authenticate('local', function(err, user, info) {
    if (err) {//error checking if user is authenticated with passport
      return next(err);
    }
    else if (!user) {//user cannot be authenticated by passport
      res.status(200).json({
        message: 'This combination of user and password does not exist',
        authenticated: false
      });
      res.end();
    }
    else {//user is authenticated by passport
      req.logIn(user, function(err) {//record user session
        if (err) {
          return next(err);
        }
        return res.status(200).json({
          message: 'Logged in successfully',
          authenticated: true
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
  req.body.password,
  function(err, account) {
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
  if (!req.isAuthenticated()) {//is authenticated if in session
    return res.status(200).json({
      authenticated: false
    });
  }
  res.status(200).json({
    authenticated: true
  });
});

router.route('/users')
.get(function(req, res){
  Account.findOne({username: req.user.username}, function(error, user){
    if(error){
      res.send(error);
    }
    else{
      res.json(user);
    }
  });
})
.put(function(req, res){
  Account.findOneAndUpdate({username: req.user.username}, {$set:{
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    skillsTL:req.body.skillsTL,
    skillsTO:req.body.skillsTO,
    bio:req.body.bio
  }}, {new: true}, function(err, doc){
    if(err){
      console.log('Error updating user: ' + err);
      res.status(500).json({message: 'User profile not updated'});
    }
    res.status(200).json({message: 'User profile updated'});
  })
});

router.get('/welcome', function(req, res){
  res.redirect('/welcome');
});
app.use('/app', router);



//start app
//=================================================================================================

app.listen(port, function(){
  console.log('\n=== listening on port ' + port + ' ===');
});

exports = module.exports = app;
