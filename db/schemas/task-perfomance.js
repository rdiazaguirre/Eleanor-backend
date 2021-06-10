const mongoose = require('mongoose');
const Schema = require('../models/task-perfomance');
module.exports = mongoose.model('TaskPerformance-' + process.env.MONGO_SCHEMA_VERSION, Schema);