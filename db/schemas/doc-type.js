const mongoose = require('mongoose');
const DocTypeSchema = require('../models/doc-type');
module.exports = mongoose.model('DocType-' + process.env.MONGO_SCHEMA_VERSION, DocTypeSchema);