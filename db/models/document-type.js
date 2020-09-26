const mongoose = require('mongoose');
const DocumentDataTypeSchema = new mongoose.Schema({
    name: String,
    companyId: String,
    createdBy: String
});

module.exports = DocumentDataTypeSchema;