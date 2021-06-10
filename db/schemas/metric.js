const mongoose = require('mongoose');
const Schema = require('../models/metric');
module.exports = mongoose.model('Metric-' + process.env.MONGO_SCHEMA_VERSION, Schema);