const mongoose = require('mongoose');
const ReceptionSchema = require('../models/reception');
module.exports = mongoose.model(`Reception-${process.env.MONGO_SCHEMA_VERSION}`, ReceptionSchema);