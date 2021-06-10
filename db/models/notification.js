const mongoose = require('mongoose');
const User = require('./user');

const NotificationSchema = new mongoose.Schema({
    user: User,
    date: Date,
    title: String,
    activityName: String,
    fontAwesome: String,
    companyId: String,
    createdBy: String
});

module.exports = NotificationSchema;