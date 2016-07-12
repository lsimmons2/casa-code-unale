/*var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
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
		trim: true,
		required: true
	},
	avatar: {
		type: String,
		required: false
		},
	email: {
		type: String,
		required: true,
		lowercase: true
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
		lowercase: true
		},
	password: {
	    type: String,
	    required: true
	},
	provider: String,
    providerId: String,
    providerData: {}
});

module.exports = mongoose.model('Account', userSchema);*/

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
	    //required: true
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
		lowercase: true
	}
    });

Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);