const mongoose = require('mongoose');
const QuoterSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    companyId: String,
    createdBy: String
});

module.exports = QuoterSchema;