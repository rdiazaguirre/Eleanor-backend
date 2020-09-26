const mongoose = require('mongoose');
const BoardSchema = require('../models/board');
module.exports = mongoose.model(`Board-${process.env.MONGO_SCHEMA_VERSION}`, BoardSchema);