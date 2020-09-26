const mongoose = require('mongoose');
const Vehicle = require('./vehicle');
const VehiclePart = require('./vehicle-part');
const Worker = require('./worker');
const User = require('./user');

const AssingWorkSchema = new mongoose.Schema({
    receptionId: String,
    evaluationId: String,
    quotationId: String,
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
        endDate: { year: Number, month: Number, day: Number }
    },
    works: [
        {
            workerId: String,
            startDate: { year: Number, month: Number, day: Number },
            endDate: { year: Number, month: Number, day: Number },
            task: String,
            finished: Boolean
        }
    ],
    companyId: String,
    branchOfficeId: String
});

module.exports = AssingWorkSchema;