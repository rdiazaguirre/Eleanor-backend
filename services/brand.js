const BrandSchema = require('../db/schemas/brand');

exports.createBrand = async (model) => {
    const response = await BrandSchema.create(model);
    return response;
}
exports.readBrand = async (id) => {
    const response = await BrandSchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateBrand = async (id, model) => {
    const response = await BrandSchema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteBrand = async (id) => {
    const response = await BrandSchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.realAllBrands = async (companyId) => {
    const response = await BrandSchema.find({ companyId: { $eq: companyId } });
    return response;
}