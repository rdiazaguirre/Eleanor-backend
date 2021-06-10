const { getQuotations, updateQuotation, removeQuotation, aproveQuotation } = require('../services/quotation');
const asyncHandler = require('../middleware/async');

exports.getQuotations = asyncHandler(async (req, res, next) => {
    const response = await getQuotations(req.body.companyId, req.params.id);
    res.status(200).json({ success: true, data: response });
})

exports.putQuotation = asyncHandler(async (req, res, next) => {
    const response = await updateQuotation(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})

exports.deleteQuotation = asyncHandler(async (req, res, next) => {
    const response = await removeQuotation(req.params.id);
    res.status(200).json({ success: true, data: response });
})

exports.postAprove = asyncHandler(async (req, res, next) => {
    const response = await aproveQuotation(req.params.id, req.body, req.user);
    res.status(200).json({ success: true, data: response });
})