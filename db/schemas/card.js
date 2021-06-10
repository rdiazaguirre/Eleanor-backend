const mongoose = require('mongoose');
const CardSchema = require('../models/card');
module.exports = mongoose.model('Card-' + process.env.MONGO_SCHEMA_VERSION, CardSchema);