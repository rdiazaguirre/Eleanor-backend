const DocTypeSchema = require('../db/schemas/doc-type');
exports.createDocType = async (model) => {
    const response = await DocTypeSchema.create(model);
    return response;
}
exports.readDocType = async (id) => {
    const response = await DocTypeSchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateDocType = async (id, model) => {
    const response = await DocTypeSchema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteDocType = async (id) => {
    const response = await DocTypeSchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllDocType = async (companyId) => {
    const response = await DocTypeSchema.find({ companyId: { $eq: companyId } });
    return response;
}