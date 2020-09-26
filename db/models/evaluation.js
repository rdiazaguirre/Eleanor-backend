const mongoose = require('mongoose');
const Vehicle = require('./vehicle');
const VehiclePart = require('./vehicle-part');
const Worker = require('./worker');
const User = require('./user');
const EvaluationSchema = new mongoose.Schema({
    receptionId: String,
    deliveryDate: Date,
    deliveryTime: Date,
    status: Number,
    vehicle: Vehicle,
    damages: [{ vehiclePart: VehiclePart, comments: String, actionId: String }],
    workers: [Worker],
    createdBy: String,
    createAt: Date,
    quoter: { Id: String, email: String, phone: String },
    companyId: String,
    branchOfficeId: String
});

module.exports = EvaluationSchema;