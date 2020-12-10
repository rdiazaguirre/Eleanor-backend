const mongoose = require('mongoose');
const Vehicle = require('./vehicle');
const VehiclePart = require('./vehicle-part');
const Worker = require('./worker');
const User = require('./user');
const QuotationSchema = new mongoose.Schema({
    receptionId: String,
    evaluationId: String,
    deliveryDate: Date,
    deliveryTime: Date,
    status: Number,
    vehicle: Vehicle,
    damages: [{ vehiclePart: VehiclePart, comments: String, actionId: String, amount: Number }],
    workers: [Worker],
    createdBy: String,
    createAt: Date,
    quoter: { Id: String, email: String, phone: String },
    planification: {
        quantityDays: Number,
        intialStageId: String,
        startDate: { year: Number, month: Number, day: Number },
        endDate: { year: Number, month: Number, day: Number },
        createdBy: String,
        createAt: Date,
    },
    companyId: String,
    branchOfficeId: String,
    aproveDate: Date
});

module.exports = QuotationSchema;