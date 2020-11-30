const mongoose = require('mongoose');
const WorkerSchema = require('../models/vehicle');
module.exports = mongoose.model('Vehicle-' + process.env.MONGO_SCHEMA_VERSION, WorkerSchema);