const AssuranceCompanySchema = require('../db/schemas/assurance-company');

exports.createAssuranceCompany = async (model) => {
    const response = await AssuranceCompanySchema.create(model);
    return response;
}
exports.readAssuranceCompany = async (id) => {
    const response = await AssuranceCompanySchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateAssuranceCompany = async (id, model) => {
    const response = await AssuranceCompanySchema.updateOne({ _id: id },model);
    return response;
}
exports.deleteAssuranceCompany = async (id) => {
    const response = await AssuranceCompanySchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllAssuranceCompany = async (companyId) => {
    const response = await AssuranceCompanySchema.find();
    return response;
}