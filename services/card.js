const CardSchema = require('../db/schemas/card');
exports.createCard = async (model) => {
    const response = await CardSchema.create(model);
    return response;
}
exports.readCard = async (id) => {
    const response = await CardSchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateCard = async (id, model) => {
    const response = await CardSchema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteCard = async (id) => {
    const response = await CardSchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllCard = async () => {
    const response = await CardSchema.find();
    return response;
}
exports.readAllCardsOfBranch = async (branchOfficeId) => {
    const response = await CardSchema.find({ branchOfficeId: { $eq: branchOfficeId } });
    return response;
}