const mongoose = require('mongoose');
const Schema = require('../models/company');
module.exports = mongoose.model('Company-' + process.env.MONGO_SCHEMA_VERSION, Schema);