const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    metrics: [
        {
            name: String,
            value: Number,
            icon: String,
        }
    ],
    works: Number,
    date: Date,
    branchOfficeId: String
});

module.exports = Schema;