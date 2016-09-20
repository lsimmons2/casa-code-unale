var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');
var bcrypt = require('bcrypt-nodejs');

var Account = new Schema({
	username: {
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
	photoURL: {
		type: String
	},
	local: {
		firstName: String,
		lastName: String,
		email: String,
		password: String,
		photoURL: String
	},
	social: {
		github: {
			id: String,
			username: String,
			token: String,
			displayName: String,
			profileURL: String,
			email: String,
			photoURL: String
		},
		linkedin: {
			id: String,
			token: String,
			tokenSecret: String,
			firstName: String,
			lastName: String,
			photoURL: String,
			email: String,
			summary: String,
			positions: Object
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
