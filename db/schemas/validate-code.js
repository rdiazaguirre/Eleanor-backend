const mongoose = require('mongoose');
const ValidateCodeSchema = require('../models/validate-code');
module.exports = mongoose.model('ValidateCode-' + process.env.MONGO_SCHEMA_VERSION, ValidateCodeSchema);