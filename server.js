var path = require('path');
var bodyParser = require('body-parser');
var config = require('./server/config/config.js');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var connect = require('connect');
var routes = require('./server/routes.js');
var mongoStore = require('connect-mongo')(session);

var env = process.env.NODE_ENV || 'development';
var sessionSecret = config.gen.sessionSecret;
var port = process.env.PORT || 80;
var dbUri = config.dbURI;

//mongoose.connect(dbUri);

mongoose.connect(dbUri);
var db = mongoose.connection;
db.on('error', function(err){
  console.log('Error connecting to db');
  return console.error(err.message);
});
db.once('connected', function(){
  return console.log('Successfully connected to ' + dbUri);
});
db.once('disconnected', function(){
  return console.error();
});
process.on('SIGINT', function(){
  mongoose.connection.close(function(){
    console.error('db connection close due to app termination');
    return process.exit(0);
  });
});

var sessionStore = new mongoStore({
  mongooseConnection: mongoose.connection,
  //any unmodified session is updated to store after 24hr
  touchAfter: 24 * 3600
})

var app = express();


if(env == 'prod'){
  app.use('/', express.static('./site/'));
}
app.use('/app', express.static('./'));


app.use(session({
  name: 'simpleLib.sess', store: sessionStore, secret: config.gen.sessionSecret, resave: true,
  saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 15}
}));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
////app.use(methodOverride('X-HTTP-Method-Override'));
app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));


app.use('/app', routes);

app.listen(port, function(){
  console.log('\n=== listening on port ' + port + ' in ' + env + ' mode ===');
});

exports = module.exports = app;
