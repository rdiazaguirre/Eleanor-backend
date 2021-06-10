const mongoose = require('mongoose');
const WorkerSchema = require('../models/worker');
module.exports = mongoose.model('Worker-' + process.env.MONGO_SCHEMA_VERSION, WorkerSchema);