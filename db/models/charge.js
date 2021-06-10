const mongoose = require('mongoose');
const ChargeSchema = new mongoose.Schema({
    name: String,
    companyId: String,
    createdBy: String
});

module.exports = ChargeSchema;