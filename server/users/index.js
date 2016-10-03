var express = require('express');
var ctrl = require('./controller.js');
var passport = require('../auth/passport.js');

var router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.get('/:username', function(req, res, next){
  return ctrl.findUser(req, res, next);
});

router.get('/', function(req, res, next){
  return ctrl.viewAllUsers(req, res, next);
});

module.exports = router;
