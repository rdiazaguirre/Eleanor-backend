const { createBoard, readBoard, updateBoard, deleteBoard, readAllBoard, readBoards } = require('../services/board');
const asyncHandler = require('../middleware/async');

exports.createBoard = asyncHandler(async (req, res, next) => {
    const response = await createBoard(req.body);
    res.status(201).json({ success: true, data: response });
})

exports.readBoard = asyncHandler(async (req, res, next) => {
    const response = await readBoard(req.params.id);
    res.status(200).json({ success: true, data: response });
})

exports.updateBoard = asyncHandler(async (req, res, next) => {
    const response = await updateBoard(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})

exports.deleteBoard = asyncHandler(async (req, res, next) => {
    const response = await deleteBoard(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAllBoard = asyncHandler(async (req, res, next) => {
    const response = await readAllBoard(req.body.companyId, req.body.createdBy, req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readBoards = asyncHandler(async (req, res, next) => {
    const response = await readBoards();
    res.status(200).json({ success: true, data: response });
})