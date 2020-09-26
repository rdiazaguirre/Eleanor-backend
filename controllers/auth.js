const { login, register, validateCode, generateActivateCode, resetPassword, newPassword } = require('../services/auth');
const { getUserCard, deleteOne } = require('../services/user');
const asyncHandler = require('../middleware/async');
const { sendTokenCookie } = require('../services/cookie');

exports.newPassword = asyncHandler(async (req, res, next) => {
    const response = await newPassword(req.body);
    res.status(200)
        .json({ success: true, data: response });
})

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const response = await resetPassword(req.body);
    res.status(200)
        .json({ success: true, data: response });
})
exports.generateActivateCode = asyncHandler(async (req, res, next) => {
    const response = await generateActivateCode(req.body);
    res.status(200)
        .json({ success: true, data: response });
})

exports.validateCode = asyncHandler(async (req, res, next) => {
    const response = await validateCode(req.body);
    res.status(200)
        .json({ success: true, data: response });
})

exports.deleteRegister = asyncHandler(async (req, res, next) => {
    const response = await deleteOne(req.params.id);
    res.status(200)
        .json({ success: true, data: response });
})

exports.login = asyncHandler(async (req, res, next) => {
    const response = await login(req.body);
    sendTokenCookie(response, 200, res);
})

exports.getUserLogued = asyncHandler(async (req, res, next) => {
    const response = req.user;
    response.companyId = req.user.companyDTO._id;
    res.status(200)
        .json({ success: true, data: response });
})

exports.register = asyncHandler(async (req, res, next) => {
    const response = await register(req.body);
    res.status(201)
        .json({ success: true, data: response });
})