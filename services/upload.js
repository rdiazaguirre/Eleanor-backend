const DocumentDataSchema = require('../db/schemas/document');
exports.upload = async (model) => {
    return await DocumentDataSchema.create(model);
}