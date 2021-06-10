const Schema = require('../db/schemas/profile');
const { readAllMenus } = require('./menu');
exports.createProfile = async (model) => {
    const response = await Schema.create(model);
    return response;
}
exports.readProfile = async (id) => {
    const response = await Schema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateProfile = async (id, model) => {
    const response = await Schema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteProfile = async (id) => {
    const response = await Schema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.readAllProfile = async (companyId) => {
    const response = await Schema.find({ companyId: { $eq: companyId } });
    return response;
}
exports.getRootProfile = async () => {
    const response = {
        name: 'root',
        menu: await readAllMenus()
    }
    return response;
}