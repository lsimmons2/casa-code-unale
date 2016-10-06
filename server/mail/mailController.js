var config = require('./config/config.js');
var nodemailer = require('nodemailer');
var path = require('path');
var templatesDir = path.resolve(__dirname, '..', 'app/mailTemplates');
var emailTemplates = require('email-templates');

var EmailAddressRequiredError = new Error('email address required');

var transporter = nodemailer.createTransport('SMTP', {
  service: 'Gmail',
  auth: {
    user: config.mail.auth.user,
    pass: config.mail.auth.pass
  }
});

function confEmail(req, res, next){{
  var locals = {
    email: 'lsimmons@umass.edu',
    subject: 'Thanks for signing up with Casa Codeunale',
    name: 'Confirmation',
    url: 'http://leosimmons.me/app/#/board'
  };
  emailTemplates(templatesDir, function(err, template){
    if(err){
      console.error('Error setting up email-templates: ', err);
      return err;
    }
    template('confirmation', locals, function(err, html, text){
      if(err){
        console.error('Error creating node-template: ', err);
        return err;
      }
      var options = {
        from: 'Leo Simmons <leooscar.simmons@gmail.com>',
        //to: user.local.email,
        to: 'lsimmons@umass.edu',
        subject: 'Casa Code-unale Sign Up Confirmation',
        text: text,
        html: html
      }
      transporter.sendMail(options, function(err, data){
        if(err){
          return console.error(err);
        }
        return res.send(data);
      })
    })
  })
}}

function resetPass(req, res, next){{
  var locals = {
    email: 'lsimmons@umass.edu',
    subject: 'Reset your Casa Code-unale password',
    name: 'Password',
    url: 'http://leosimmons.me/app/#/passwordreset'
  };
  emailTemplates(templatesDir, function(err, template){
    if(err){
      console.error('Error setting up email-templates: ', err);
      return err;
    }
    template('password', locals, function(err, html, text){
      if(err){
        console.error('Error creating node-template: ', err);
        return err;
      }
      var options = {
        from: 'Leo Simmons <leooscar.simmons@gmail.com>',
        //to: user.local.email,
        to: 'lsimmons@umass.edu',
        subject: 'Reset your Casa Code-unale password',
        text: text,
        html: html
      }
      transporter.sendMail(options, function(err, data){
        if(err){
          return console.error(err);
        }
        return res.send('you would be redirected to pass reset page');
      })
    })
  })
}}

module.exports = {
  confEmail: confEmail,
  resetPass: resetPass
}
