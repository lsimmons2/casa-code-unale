var express = require('express');
var ctrl = require('./controller.js');
var passport = require('../auth/passport.js');

var router = express.Router();

router.use(passport.initialize());
router.use(passport.session());

router.route('/')
  .get(function(req, res, next){
    return ctrl.getUser(req, res, next);
  })
  .put(function (req, res, next) {
    return ctrl.updateUser(req, res, next);
  })
  .delete(function (req, res, next) {
    return ctrl.deleteUser(req, res, next);
  });

router.post('/compProf', function(req, res, next) {
  return ctrl.compProf(req, res, next);
});

module.exports = router;
