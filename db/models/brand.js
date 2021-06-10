const mongoose = require('mongoose');
const CarModel = require('./car-model');
const User = require('./user');

const BrandSchema = new mongoose.Schema({
    name: String,
    models: [CarModel],
    createdAt: Date,
    createdBy: User,
    companyId: String,
    createdBy: String,
});

module.exports = BrandSchema;