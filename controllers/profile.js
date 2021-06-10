const { createProfile, readAllProfile, readProfile, updateProfile, deleteProfile } = require('../services/profile');
const asyncHandler = require('../middleware/async');

exports.createProfile = asyncHandler(async (req, res, next) => {
    const response = await createProfile(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readProfile = asyncHandler(async (req, res, next) => {
    const response = await readProfile(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateProfile = asyncHandler(async (req, res, next) => {
    const response = await updateProfile(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteProfile = asyncHandler(async (req, res, next) => {
    const response = await deleteProfile(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAllProfile = asyncHandler(async (req, res, next) => {
    const response = await readAllProfile(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})