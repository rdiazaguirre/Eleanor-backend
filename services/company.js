const Schema = require('../db/schemas/company');
exports.createCompany = async (model) => {
    const response = await Schema.create(model);
    return response;
}
exports.readCompany = async (id) => {
    const response = await Schema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateCompany = async (id, model) => {
    const response = await Schema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteOneCompany = async (id) => {
    const response = await Schema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllCompanies = async (id) => {
    const response = await Schema.find({ _id: { $eq: id } });
    return response;
}