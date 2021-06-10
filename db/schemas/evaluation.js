const mongoose = require('mongoose');
const EvaluationSchema = require('../models/evaluation');
module.exports = mongoose.model('Evaluation-' + process.env.MONGO_SCHEMA_VERSION, EvaluationSchema);