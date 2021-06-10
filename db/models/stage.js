const mongoose = require('mongoose');
const StageSchema = new mongoose.Schema({
    name: String,
    order: Number,
    companyId: String,
    createdBy: String
});

module.exports = StageSchema;