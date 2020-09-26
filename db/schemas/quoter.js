const mongoose = require('mongoose');
const QuoterSchema = require('../models/quoter');
module.exports = mongoose.model('Quoter-' + process.env.MONGO_SCHEMA_VERSION, QuoterSchema);