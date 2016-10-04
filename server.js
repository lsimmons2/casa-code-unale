var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var connect = require('connect');


var env = process.env.NODE_ENV || 'dev';
var config = require('./server/config/config.js');


var userRoutes = require('./server/users/index.js');
var usersRoutes = require('./server/user/index.js');
var authRoutes = require('./server/auth/index.js');
var mongoStore = require('connect-mongo')(session);


var dbUri = config.dbURI;
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


var app = express();


var sessionSecret = config.gen.sessionSecret;
var sessionStore = new mongoStore({
  mongooseConnection: mongoose.connection,
  //any unmodified session is updated to store after 24hr
  touchAfter: 24 * 3600
})
app.use(session({
  name: 'simpleLib.sess',
  store: sessionStore,
  secret: config.gen.sessionSecret,
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 15}
}));


app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(cookieParser());


if(env == 'dev'){
  var port = 8080;
} else {
  var port = process.env.PORT || 80;
  app.use('/', express.static('./site/'));
}
app.use('/app', express.static('./'));

function logReq(req, res, next){
  console.log(req.method, req.baseUrl + req.url);
  next();
};


app.use('/user', logReq, require('./server/user/index.js'));
app.use('/users', logReq, require('./server/users/index.js'));
app.use('/auth', logReq, require('./server/auth/index.js'));
app.use('/aws', logReq, require('./server/aws/index.js'));
//http request message for personal website
app.use('/message', require('./site/message.js'));

app.listen(port, function(){
  console.log('\n💥💥💥  app listening on port ' + port + ' in ' + env + ' mode 💥💥💥');
});

//exports = module.exports = app;
module.exports = app;
