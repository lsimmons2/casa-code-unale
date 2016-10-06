var UserModel = require('../userModel.js');
var request = require('request');

var aws = require('aws-sdk');
aws.config.loadFromPath('./server/config/awsConfig.json');
//aws.config.loadFromPath('../../server/config/awsConfig.json');
var s3 = new aws.S3();
var bucketConfig = require('../config/aws.js');

function imageUpload(req, res, next){
	var params = {
		Bucket: bucketConfig.imageBucket,
		Key: req.body.name,
		ContentType: req.body.type
	}
	return s3.getSignedUrl('putObject', params, function(err, url){
		if(err){
			res.send(err);
		}
		UserModel.findOne({'username': req.user.username}, 'photoURL', function(err, user){
			if(err){
				return next(err);
			}
			if(user == null){
				return res.status(404).json('User not found in db');
			}
			var s3Url = bucketConfig.bucketURL + req.body.name;
			user.local.photoURL = s3Url;
			user.save(function(err, user){
				if(err){
					return next(err);
				}
				return res.json({
					signedUrl: url,
					s3Url: s3Url
				});
			})
		})
	})
}

module.exports = {
  imageUpload: imageUpload
}
