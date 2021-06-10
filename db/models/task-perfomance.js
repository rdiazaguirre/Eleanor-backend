const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    completed: Number,
    actives: Number,
    overdue: Number,
    date: Date,
    branchOfficeId: String
});

module.exports = Schema;