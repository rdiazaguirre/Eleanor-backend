const { createCard, readCard, updateCard, deleteCard, readAllCard } = require('../services/card');
const asyncHandler = require('../middleware/async');

exports.createCard = asyncHandler(async (req, res, next) => {
    const response = await createCard(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readCard = asyncHandler(async (req, res, next) => {
    const response = await readCard(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateCard = asyncHandler(async (req, res, next) => {
    const response = await updateCard(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteCard = asyncHandler(async (req, res, next) => {
    const response = await deleteCard(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAllCard = asyncHandler(async (req, res, next) => {
    const response = await readAllCard();
    res.status(200).json({ success: true, data: response });
})