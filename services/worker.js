const WorkerSchema = require('../db/schemas/worker');
exports.createWorker = async (model) => {
    const response = await WorkerSchema.create(model);
    return response;
}
exports.readWorker = async (id) => {
    const response = await WorkerSchema.findOne({ _id: { $eq: id } });
    return response;
}
exports.updateWorker = async (id, model) => {
    const response = await WorkerSchema.updateOne({ _id: id }, model);
    return response;
}
exports.deleteWorker = async (id) => {
    const response = await WorkerSchema.deleteOne({ _id: { $eq: id } });
    return response;
}
exports.realAllWorkers = async (companyId) => {
    const response = await WorkerSchema.find({ companyId: { $eq: companyId } });
    return response;
}