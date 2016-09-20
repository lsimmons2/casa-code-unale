var path = require('path');
var bodyParser = require('body-parser');
var config = require('./app/_config');
var express = require('express');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var connect = require('connect');
var routes = require('./app/routes.js');

var sessionSecret = config.gen.sessionSecret;

var app = express();
var port = process.env.PORT || 80;
var uri = 'mongodb://localhost:27017/test';
mongoose.connect(uri);


app.use('/', express.static('./site/'));
app.use('/app', express.static('./'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(bodyParser.urlencoded({extended: true}));
//app.use(methodOverride('X-HTTP-Method-Override'));

app.use(session({
  secret: sessionSecret,
  resave: false,
  saveUninitialized: false
}));


app.use('/app', routes);

app.listen(port, function(){
  console.log('\n=== listening on port ' + port + ' ===');
});

exports = module.exports = app;
