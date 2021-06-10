const mongoose = require('mongoose');

const VehicleSchema = new mongoose.Schema({
    plate: String,
    brandId: String,
    modelId: String,
    mandatory: Boolean,
    kilometers: Number,
    year: Number,
    color: String,
    gasLevel: Number,
    auto3P: String
});

module.exports = VehicleSchema;