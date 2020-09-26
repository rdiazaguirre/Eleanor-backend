const mongoose = require('mongoose');
const Vehicle = require('./vehicle');
const User = require('./user');
const Schema = new mongoose.Schema({
    stage: [
        {
            stageId: String,
            order: Number,
            cards: [
                {
                    receptionId: String,
                    vehicle: Vehicle,
                    status: Number,
                    workers: [{
                        name: String,
                        avatar: String,
                        charge: String,
                        createdAt: Date,
                        createdBy: String,
                        companyId: String
                    }],
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
                        publisher: {
                            companyId: String,
                            root: Boolean,
                            name: String,
                            company: String,
                            companyDTO: {},
                            avatar: String,
                            charge: String,
                            email: String,
                            createAt: {
                                type: Date,
                                defaut: Date.now
                            },
                            active: {
                                type: Boolean,
                                default: false
                            },
                            type: {
                                type: String,
                                enum: ['register', 'user'],
                                default: 'user'
                            },
                            createdBy: String
                        },
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
                }
            ]
        }
    ],
    companyId: String,
    branchOfficeId: String
});
module.exports = Schema;