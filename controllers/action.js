const { create, read, update, deleteOne, readAll } = require('../services/action');
const asyncHandler = require('../middleware/async');

exports.create = asyncHandler(async (req, res, next) => {
    const response = await create(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.read = asyncHandler(async (req, res, next) => {
    const response = await read(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.update = asyncHandler(async (req, res, next) => {
    const response = await update(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteOne = asyncHandler(async (req, res, next) => {
    const response = await deleteOne(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAll = asyncHandler(async (req, res, next) => {
    const response = await readAll(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})