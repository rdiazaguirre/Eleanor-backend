const Schema = require('../db/schemas/vehicle');

exports.vehicleReport = async(id) => {
    const response = await Schema.findOne({ _id: { $eq: id } });
    return response;
}

const Schema = require('../db/schemas/vehicle');

exports.realAll = async(id) => {
    const response = await Schema.find()
    return response;
}