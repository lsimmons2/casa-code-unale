var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	firstName : {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	userID: {
		type: String,
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
	}

});