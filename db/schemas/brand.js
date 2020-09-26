const mongoose = require('mongoose');
const BrandSchema = require('../models/brand');
module.exports = mongoose.model('Brand-' + process.env.MONGO_SCHEMA_VERSION, BrandSchema);