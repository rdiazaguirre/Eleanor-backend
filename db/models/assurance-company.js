const mongoose = require('mongoose');

const AssuranceCompanySchema = new mongoose.Schema({
    name: String,
    contact: {
        name: String,
        email: String,
        phone: String
    },
    companyId: String,
    createdBy: String,
});

module.exports = AssuranceCompanySchema;