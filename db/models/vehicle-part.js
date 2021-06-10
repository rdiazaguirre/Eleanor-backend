const mongoose = require('mongoose');

const VehiclePartSchema = new mongoose.Schema({
    name: String,
    companyId: String,
    createdBy: String
});

module.exports = VehiclePartSchema;