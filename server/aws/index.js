var express = require('express');
var ctrl = require('./controller.js');
var passport = require('../auth/passport.js');

var router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.post('/signature', function(req, res, next){
  return ctrl.imageUpload(req, res, next);
})

module.exports = router;
