const mongoose = require('mongoose');
const StageSchema = require('../models/stage');
module.exports = mongoose.model('Stage-' + process.env.MONGO_SCHEMA_VERSION, StageSchema);