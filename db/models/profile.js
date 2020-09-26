const mongoose = require('mongoose');
const Schema = new mongoose.Schema({
    name: String,
    companyId: String,
    createdBy: String,
    menu: []
});

module.exports = Schema;