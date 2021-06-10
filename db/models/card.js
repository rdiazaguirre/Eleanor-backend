const mongoose = require('mongoose');
const Worker = require('./worker');
const Vehicle = require('./vehicle');
const User = require('./user');
const VehiclePart = require('./vehicle-part');

const CardSchema = new mongoose.Schema({
    receptionId: String,
    vehicle: Vehicle,
    status: Number,
    workers: [Worker],
    planification: {
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
    comments: [{
        text: String,
        createdAt: Date,
        publisher: User,
        files: [{
            base64: String,
            type: String
        }]
    }],
    history: [{
        stageId: String,
        createdAt: Date,
        createdBy: String,
        log: String
    }],
    createdAt: Date,
    createdBy: String,
    companyId: String,
    branchOfficeId: String,
    createdByUser: {}
});

module.exports = CardSchema;