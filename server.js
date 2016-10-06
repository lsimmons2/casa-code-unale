var path = require('path');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var connect = require('connect');
var morgan = require('morgan');
var fs = require('fs');
var fileStreamRotator = require('file-stream-rotator');


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

if(env == 'prod'){
  var logDir = path.join(__dirname, 'logs');
  fs.existsSync(logDir) || fs.mkdirSync(logDir);
  var logStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'access-%DATE%.log'),
    frequency: 'daily',
    verbose: false
  });
  app.use(morgan('combined', {stream: logStream}));
};

app.use('/user', require('./server/user/index.js'));
app.use('/users', require('./server/users/index.js'));
app.use('/auth', require('./server/auth/index.js'));
app.use('/aws', require('./server/aws/index.js'));
//http request message for personal website
app.use('/message', require('./site/message.js'));


app.listen(port, function(){
  console.log('\n💥💥💥  app listening on port ' + port + ' in ' + env + ' mode 💥💥💥');
});

//exports = module.exports = app;
module.exports = app;
