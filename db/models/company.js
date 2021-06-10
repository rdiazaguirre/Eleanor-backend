const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: String,
    branchesOffices: [{
        name: String
    }]
});

module.exports = Schema;