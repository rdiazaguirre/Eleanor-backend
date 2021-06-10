const mongoose = require('mongoose');
const Schema = require('../models/action');
module.exports = mongoose.model('Action-' + process.env.MONGO_SCHEMA_VERSION, Schema);