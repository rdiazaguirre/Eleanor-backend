const { createWorker, readWorker, updateWorker, deleteWorker, realAllWorkers } = require('../services/worker');
const asyncHandler = require('../middleware/async');

exports.createWorker = asyncHandler(async (req, res, next) => {
    const response = await createWorker(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readWorker = asyncHandler(async (req, res, next) => {
    const response = await readWorker(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateWorker = asyncHandler(async (req, res, next) => {
    const response = await updateWorker(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteWorker = asyncHandler(async (req, res, next) => {
    const response = await deleteWorker(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.realAllWorkers = asyncHandler(async (req, res, next) => {
    const response = await realAllWorkers(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})