const mongoose = require('mongoose');
const Schema = require('../models/profile');
module.exports = mongoose.model('Profile-' + process.env.MONGO_SCHEMA_VERSION, Schema);