const mongoose = require('mongoose');
const AssingWorkSchema = require('../models/assing-work');
module.exports = mongoose.model('AssingWork-' + process.env.MONGO_SCHEMA_VERSION, AssingWorkSchema);