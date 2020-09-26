const mongoose = require('mongoose');
const DocumentDataSchema = require('../models/document');
module.exports = mongoose.model('DocumentData-' + process.env.MONGO_SCHEMA_VERSION, DocumentDataSchema);