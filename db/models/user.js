const mongoose = require('mongoose');
const NotificationSchema = require('./notification');
const Company = require('./company');
const MessageSchema = require('./message');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
	companyId: String,
	root: {
		type: Boolean,
		default: false
	},
	name: {
		type: String,
		required: [true, 'name must have value.'],
		maxlength: [50, 'name can not be more than 50 characters.']
	},
	company: {
		type: String,
		required: [true, 'company must have value.'],
		maxlength: [50, 'company can not be more than 50 characters.']
	},
	companyDTO: Company,
	avatar: String,
	charge: {
		type: String,
		required: [true, 'charge must have value.'],
		maxlength: [50, 'charge can not be more than 50 characters.']
	},
	email: {
		type: String,
		unique: true,
		match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			'email is incorrect format'
		],
		required: [true, 'email must have value.'],
		maxlength: [50, 'email can not be more than 50 characters.']
	},
	password: {
		type: String,
		required: [true, 'password must have value.'],
		maxlength: [10, 'password can not be more than 10 characters.'],
		select: false,
		validate: {
			validator: function (val) {
				return val.length >= 8 || val.length === 0
			},
			message: () => `password can not be less than 8 characters.`
		},
	},
	resetPasswordToken: String,
	resetPasswordExpire: Date,
	menus: [
		{ id: Number, name: String }
	],
	profiles: [],
	notifications: [NotificationSchema],
	messages: [MessageSchema],
	createAt: {
		type: Date,
		defaut: Date.now
	},
	expiresAt: Date,
	active: {
		type: Boolean,
		default: false
	},
	type: {
		type: String,
		enum: ['register', 'user'],
		default: 'user'
	},
	createdBy: String
});

// Encryp password.
UserSchema.pre('save', async function (next) {
	const salt = await bcrypt.genSalt(10);
	this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.encrypPassword = async function (enteredPassword) {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(enteredPassword, salt);
}

UserSchema.methods.matchPassword = async function (enteredPassword) {
	return await bcrypt.compare(enteredPassword, this.password);
}

// JWT
UserSchema.methods.getSignedJwtToken = function () {
	return jwt.sign(
		{ id: this._id, },
		process.env.JWT_SECRET,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
}
module.exports = UserSchema;