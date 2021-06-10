const { createDocType, readDocType, updateDocType, deleteDocType, readAllDocType } = require('../services/doc-type');
const asyncHandler = require('../middleware/async');

exports.createDocType = asyncHandler(async (req, res, next) => {
    const response = await createDocType(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readDocType = asyncHandler(async (req, res, next) => {
    const response = await readDocType(req.body.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateDocType = asyncHandler(async (req, res, next) => {
    const response = await updateDocType(req.body._id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteDocType = asyncHandler(async (req, res, next) => {
    const response = await deleteDocType(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAllDocType = asyncHandler(async (req, res, next) => {
    const response = await readAllDocType(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})