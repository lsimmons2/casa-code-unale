var passport = require('passport');
var config = require('./config/config.js');
var User = require('./userModel.js');


var LocalStrategy = require('passport-local').Strategy;

var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var linkedInKey = config.linkedin.clientID;
var linkedInSecret = config.linkedin.clientSecret;
var linkedInCbURL = config.linkedin.callbackURL;

var GitHubStrategy = require('passport-github');
var githubID = config.github.clientID;
var githubSecret = config.github.clientSecret;
var githubcbURL = config.github.callbackURL;


passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if(err) {
      console.error('There was an error accessing the records of' +
      ' user with id: ' + id);
      return done(err);
    }
    return done(null, user);
  })
});


passport.use('local-signup', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {
  process.nextTick(function() {
    if(!req.user) {
      User.findOne({'username': req.body.username}, function(err, user){
        if(err){
          console.log('Error finding user by username: ', err);
          return done(err);
        }
        if(user){
          return done(null, false, {errMsg: 'username already exists'});
        }
        User.findOne({'local.email': email}, function(err, user) {
          if(err) {
            console.error(err);
            return done(err);
          }
          if(user) {
            //should tell user their email has already been used
            return done(null, false, {errMsg: 'email already exists'});
          }
          else {
            console.log('Registering new user');
            var newUser = new User();
            newUser.local.firstName = req.body.firstName;
            newUser.local.lastName = req.body.lastName;
            newUser.username = req.body.username;
            newUser.local.email = email;
            newUser.local.password = newUser.generateHash(password);
            newUser.skillsTO = req.body.skillsTO;
            newUser.skillsTL = req.body.skillsTL;
            newUser.bio = req.body.bio;
            newUser.save(function(err) {
              if(err) {
                console.log('Error saving new user: ', err);
                if(err.message == 'User validation failed') {
                  return done(null, false, {errMsg: 'Please fill all fields'});
                }
                  console.error('Error saving new user: ', err);
                  return done(err);
              }
              return done(null, newUser);
            });
          }
        });
      })
    }
    else {//user exists and is loggedin
      var user = req.user;
      user.username = req.body.username;
      user.local.email = email;
      user.local.password = user.generateHash(password);
      // save modifications to user
      user.save(function(err) {
        if (err) {
          console.error(err);
          return done(err);
        }
        return done(null, user);
      });
    }
  });
}));



passport.use('local-login', new LocalStrategy({
  usernameField : 'email',
  passwordField : 'password',
  passReqToCallback : true
},
function(req, email, password, done) {
  User.findOne({'local.email': email}, function(err, user) {
    if(err) {
      console.log('err finding user in local-login');
      return done(err);
    }
    if(!user) {
      console.log('user doesn\'t exist when trying to log in locally');
      return done(null, false);
    }
    return done(null, user);
  });
})
);


passport.use(new GitHubStrategy({
    clientID: githubID,
    clientSecret: githubSecret,
    callbackURL: githubcbURL,
    passReqToCallback : true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function() {
      console.log('github profile: ', profile);
      if(!req.user) {//confirm that user not logged in
        User.findOne({'social.github.id': profile.id}, function(err, user){
        if(err){
          console.log('There was an error accessing the db for linkedin auth: ', err);
          return done(err);
        }
        if (user){
          return done(null, user);
        }
        else {
          var newUser = new User();
          newUser.social.github.id = profile.id;
          newUser.social.github.username = profile.username;
          newUser.social.github.token = accessToken;
          newUser.social.github.displayName = profile.displayName;
          newUser.social.github.email = profile.emails[0].value;
          newUser.social.github.photoURL = profile.photos[0].value || '';
          newUser.social.github.profileUrl = profile.profileUrl;
          newUser.save(function(err) {
            if (err) {
              console.log('Error saving new github user!!', err);
              return done(err);
            }
            return done(null, newUser);
          });
        }
      });
    }
    else {//need to find out if github account created separately
      User.findOne({'social.github.id': profile.id}, function(err, user){
        if(err){
          console.log('error finding github user: ', err);
        }
        if(user){
          var currentUser = req.user;
          currentUser.social.github.id = profile.id;
          currentUser.social.github.username = profile.username;
          currentUser.social.github.token = accessToken;
          currentUser.social.github.displayName = profile.displayName;
          currentUser.social.github.email = profile.emails[0].value;
          currentUser.social.github.photoURL = profile.photos[0].value || '';
          currentUser.social.github.profileUrl = profile.profileUrl;
          currentUser.save(function(err){
            if(err){
              console.log('err updating user: ', err);
              return done(err);
            }
            User.findOneAndRemove({'social.github.id': profile.id}, function(err, deletedUser){
              if(err){
                console.log('error deleting old user: ', err);
                return done(err);
              }
              return done(null, currentUser);
            })
          })
        }
        else {//no user created separately, update the users info with github info
          var user = req.user;
          user.social.github.id = profile.id;
          user.social.github.username = profile.username;
          user.social.github.token = accessToken;
          user.social.github.displayName = profile.displayName;
          user.social.github.email = profile.emails[0].value;
          user.social.github.photoURL = profile.photos[0].value || '';
          user.social.github.photoURL = profile.photos[0].value
          user.save(function(err) {
            if (err) {
              console.error(err);
              return done(err);
            }
            return done(null, user);
          });
        }
      })

    }
  });
}));


passport.use(new LinkedInStrategy({
    clientID: linkedInKey,
    clientSecret: linkedInSecret,
    callbackURL: linkedInCbURL,
    scope: ['r_emailaddress', 'r_basicprofile'],
    state: true,
    passReqToCallback : true
  },
  function(req, token, tokenSecret, profile, done) {
    //console.log('profile: ', profile);
    console.log('got all the shit');
    process.nextTick(function() {
      if(!req.user) {//confirm that user not logged in
        User.findOne({'social.linkedin.id': profile.id}, function(err, user){
        if(err){
          console.log('There was an error accessing the db for linkedin auth: ', err);
          return done(err);
        }
        if (user){
          return done(null, user);
        }
        else {//create new user b/c they don't exist yet
          var newUser = new User();
          newUser.social.linkedin.id = profile.id;
          newUser.social.linkedin.token = token;
          newUser.social.linkedin.tokenSecret = tokenSecret;
          newUser.social.linkedin.firstName = profile.name.givenName;
          newUser.social.linkedin.lastName = profile.name.familyName;
          newUser.social.linkedin.email = profile.emails[0].value;
          newUser.social.linkedin.photoURL = profile._json.pictureUrl || '';
          newUser.social.linkedin.summary = profile._json.summary;
          newUser.social.linkedin.positions = profile._json.positions.values;
          newUser.social.linkedin.profileURL = profile._json.publicProfileUrl;
          newUser.save(function(err) {
            if (err) {
              console.log('Error saving new user!!', err);
              return done(err);
            }
            console.log('\nnew user created\n');
            return done(null, newUser);
          });
        }
      });
    }
    else {//need to find out if linkedin account created separately
      User.findOne({'social.linkedin.id': profile.id}, function(err, user){
        if(err){
          console.log('error finding linkedin user: ', err);
        }
        if(user){//user logged in with local or github account, and their linkedin account already exists
          var currentUser = req.user;
          currentUser.social.linkedin.id = profile.id;
          currentUser.social.linkedin.token = token;
          currentUser.social.linkedin.firstName = profile.name.givenName;
          currentUser.social.linkedin.lastName = profile.name.familyName;
          currentUser.social.linkedin.email = profile.emails[0].value;
          currentUser.social.linkedin.photoURL = profile._json.pictureUrl || '';
          currentUser.social.linkedin.summary = profile._json.summary;
          currentUser.social.linkedin.positions = profile._json.positions.values;
          currentUser.social.linkedin.profileURL = profile._json.publicProfileUrl;
          currentUser.save(function(err){
            if(err){
              console.log('err updating user: ', err);
              return done(err);
            }
            User.findOneAndRemove({'social.linkedin.id': profile.id}, function(err, deletedUser){
              if(err){
                console.log('error deleting old user: ', err);
                return done(err);
              }
              console.log('old linkedin account deleted, linkedin info added to current user');
              return done(null, currentUser);
            })
          })
        }
        else {//no user created separately, update the users info with linkedin info
          var user = req.user;
          user.social.linkedin.id = profile.id;
          user.social.linkedin.token = token;
          user.social.linkedin.firstName = profile.name.givenName;
          user.social.linkedin.lastName = profile.name.familyName;
          user.social.linkedin.email = profile.emails[0].value;
          user.social.linkedin.photoURL = profile._json.pictureUrl || '';
          user.social.linkedin.summary = profile._json.summary;
          user.social.linkedin.positions = profile._json.positions.values;
          user.social.linkedin.profileUrl = profile._json.publicProfileUrl;
          user.save(function(err) {
            if (err) {
              console.error(err);
              return done(err);
            }
            console.log('new linkedin user created');
            return done(null, user);
          });
        }
      })

    }
  });
}));


module.exports = passport;
