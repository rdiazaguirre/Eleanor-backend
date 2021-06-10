
const Schema = require('../db/schemas/action');

exports.create = async (model) => {
    const response = await Schema.create(model);
    return response;
}
exports.read = async (id) => {
    const response = await Schema.findOne({ _id: { $eq: id } });
    return response;
}
exports.update = async (id, model) => {
    const response = await Schema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteOne = async (id) => {
    const response = await Schema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAll = async (companyId) => {
    const response = await Schema.find({ companyId: { $eq: companyId } })
    return response;
}