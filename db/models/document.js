const mongoose = require('mongoose')
const DocumentDataSchema = new mongoose.Schema({
    docTypeId: String,
    name: String,
    base64: String,
    type: String,
    companyId: String,
    createdBy: String
});

module.exports = DocumentDataSchema;