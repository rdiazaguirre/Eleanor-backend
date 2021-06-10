const mongoose = require('mongoose');
const Vehicle = require('./vehicle');
const DocumentData = require('./document');
const VehicleInventory = require('./vehicle-inventory');
const VehiclePart = require('./vehicle-part');
const Worker = require('./worker');

const ReceptionSchema = new mongoose.Schema({
    deliveryDate: Date,
    deliveryTime: Date,
    status: Number,
    vehicle: Vehicle,
    claimNumber: String,
    assuranceCompany: {
        assuranceCompanyId: String,
        contact: {
            name: String,
            email: String,
            phone: String
        }
    },
    persons: {
        owner: {
            fiscalId: String,
            name: String,
            email: String,
            phone: String
        },
        deliver: {
            fiscalId: String,
            name: String,
            email: String,
            phone: String
        }
    },
    documents: [DocumentData],
    inventory: [VehicleInventory],
    comments: String,
    damages: [{ vehiclePart: VehiclePart, comments: String }],
    workers: [Worker],
    createdBy: String,
    createAt: Date,
    companyId: String,
    branchOfficeId: String
});

module.exports = ReceptionSchema;