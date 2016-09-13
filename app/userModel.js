var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
	firstName : {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	username: {
		type: String,
		required: true
	},
	password: {
	    type: String,
	},
	email: {
		type: String,
		required: true,
		lowercase: true
	},
	avatar: {
	    type: String,
	    required: false
	},
	skillsTO: {
		type: Array,
		required: true,
		lowercase: true
	},
	skillsTL: {
		type: Array,
		required: true,
		lowercase: true
	},
	bio: {
		type: String,
		required: false,
		lowercase: false
	}
    });

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
