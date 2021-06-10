
const mongoose = require('mongoose');
const User = require('./user');
const CarModel = new mongoose.Schema({
    name: String,
    mandatory: Boolean,
    createdAt: Date,
    createdBy: String,
    companyId: String
});

module.exports = CarModel;