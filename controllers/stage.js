const { createStage, readStage, updateStage, deleteStage, readAllStages, deleteAllStages } = require('../services/stage');
const asyncHandler = require('../middleware/async');

exports.createStage = asyncHandler(async (req, res, next) => {
    const response = await createStage(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readStage = asyncHandler(async (req, res, next) => {
    const response = await readStage(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateStage = asyncHandler(async (req, res, next) => {
    const response = await updateStage(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteStage = asyncHandler(async (req, res, next) => {
    const response = await deleteStage(req.params.id);
    res.status(200).json({ success: true, data: response });
})

exports.readAllStages = asyncHandler(async (req, res, next) => {
    const response = await readAllStages(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})
exports.deleteAllStages = asyncHandler(async (req, res, next) => {
    const response = await deleteAllStages(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})