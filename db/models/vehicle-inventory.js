const mongoose = require('mongoose');

const VehicleInventorySchema = new mongoose.Schema({
    name: String,
    checked: Boolean,
    companyId: String,
    createdBy: String
});

module.exports = VehicleInventorySchema