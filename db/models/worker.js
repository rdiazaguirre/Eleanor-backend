const mongoose = require('mongoose');
const WorkerSchema = new mongoose.Schema({
    name: String,
    avatar: String,
    charge: String,
    createdAt: Date,
    createdBy: String,
    companyId: String
});

module.exports = WorkerSchema;