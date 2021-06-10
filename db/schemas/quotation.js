const mongoose = require('mongoose');
const QuotationSchema = require('../models/quotation');
module.exports = mongoose.model('Quotation-' + process.env.MONGO_SCHEMA_VERSION, QuotationSchema);