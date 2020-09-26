const { create, read, update, deleteOne, realAll, getUserMenu, getNewUser, getUserCard } = require('../services/user');
const asyncHandler = require('../middleware/async');

exports.getUserCard = asyncHandler(async (req, res, next) => {
    const response = await getUserCard(req.user);
    res.status(200).json({ success: true, data: response });
})

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
exports.realAll = asyncHandler(async (req, res, next) => {
    const response = await realAll(req.user.companyDTO._id);
    res.status(200).json({ success: true, data: response });
})
exports.getUserMenu = asyncHandler(async (req, res, next) => {
    const response = await getUserMenu(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.getNewUser = asyncHandler(async (req, res, next) => {
    const response = await getNewUser(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})