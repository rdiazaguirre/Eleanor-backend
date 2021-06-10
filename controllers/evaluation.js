const { getAllEvaluation, updateEvaluation, removeEvaluation } = require('../services/evaluation');
const asyncHandler = require('../middleware/async');

exports.getEvaluations = asyncHandler(async (req, res, next) => {
    const response = await getAllEvaluation(req.body.companyId, req.params.id);
    res.status(200).json({ success: true, data: response });
})

exports.putEvaluation = asyncHandler(async (req, res, next) => {
    const response = await updateEvaluation(req.params.id, req.body, true);
    res.status(200).json({ success: true, data: response });
})

exports.deleteEvaluation = asyncHandler(async (req, res, next) => {
    const response = await removeEvaluation(req.params.id);
    res.status(200).json({ success: true, data: response });
})