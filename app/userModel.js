var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var Account = new Schema({
	firstName : {
		type: String
	},
	lastName: {
		type: String
	},
	username: {
		type: String
	},
	password: {
	    type: String
	},
	email: {
		type: String
	},
	avatar: {
	    type: String
	},
	skillsTO: {
		type: Array
	},
	skillsTL: {
		type: Array
	},
	bio: {
		type: String
	},
	social: {
		facebook: {
			id: String,
			token: String,
			displayName: String,
			email: String,
			photo: String
		},
		linkedin: {
			id: String,
			token: String,
			tokenSecret: String,
			firstName: String,
			lastName: String,
			email: String,
			summary: String
		}
	}
});

Account.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
};

Account.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Account', Account);
