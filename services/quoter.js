const QuoterSchema = require('../db/schemas/quoter');
exports.createQuoter = async (model) => {
    const response = await QuoterSchema.create(model);
    return response;
}
exports.readQuoter = async (id) => {
    const response = await QuoterSchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateQuoter = async (id, model) => {
    const response = await QuoterSchema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteQuoter = async (id) => {
    const response = await QuoterSchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllQuoter = async (companyId) => {
    const response = await QuoterSchema.find({ companyId: { $eq: companyId } });
    return response;
}