const mongoose = require('mongoose');
const ValidateCode = new mongoose.Schema({
    date: Date,
    email: String,
    validated: {
        type: Boolean,
        default: false
    }
});
module.exports = ValidateCode;