const mongoose = require('mongoose');
const User = require('./user');

const ActionSchema = new mongoose.Schema({
    name: String,
    createdAt: Date,
    createdBy: String,
    companyId: String
});

module.exports = ActionSchema;