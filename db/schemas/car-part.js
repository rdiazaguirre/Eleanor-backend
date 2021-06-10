const mongoose = require('mongoose');
const CarPartSchema = require('../models/car-part');
module.exports = mongoose.model('CarPart-' + process.env.MONGO_SCHEMA_VERSION, CarPartSchema);