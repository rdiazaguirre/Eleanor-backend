const mongoose = require('mongoose');
const AssuranceCompanySchema = require('../models/assurance-company');
module.exports = mongoose.model('AssuranceCompany-' + process.env.MONGO_SCHEMA_VERSION, AssuranceCompanySchema);