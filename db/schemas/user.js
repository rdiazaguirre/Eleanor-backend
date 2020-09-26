const mongoose = require('mongoose');
const UserSchema = require('../models/user');
module.exports = mongoose.model('User-' + process.env.MONGO_SCHEMA_VERSION, UserSchema);