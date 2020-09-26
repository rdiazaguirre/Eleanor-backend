const { createQuoter, readQuoter, updateQuoter, deleteQuoter, readAllQuoter } = require('../services/quoter');
const asyncHandler = require('../middleware/async');

exports.createQuoter = asyncHandler(async (req, res, next) => {
    const response = await createQuoter(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readQuoter = asyncHandler(async (req, res, next) => {
    const response = await readQuoter(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateQuoter = asyncHandler(async (req, res, next) => {
    const response = await updateQuoter(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteQuoter = asyncHandler(async (req, res, next) => {
    const response = await deleteQuoter(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAllQuoter = asyncHandler(async (req, res, next) => {
    const response = await readAllQuoter(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})