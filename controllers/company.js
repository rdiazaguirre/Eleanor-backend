const { createCompany, readCompany, updateCompany, deleteOneCompany, readAllCompanies } = require('../services/company');
const asyncHandler = require('../middleware/async');

exports.createCompany = asyncHandler(async (req, res, next) => {
    const response = await createCompany(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readCompany = asyncHandler(async (req, res, next) => {
    const response = await readCompany(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateCompany = asyncHandler(async (req, res, next) => {
    const response = await updateCompany(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteOneCompany = asyncHandler(async (req, res, next) => {
    const response = await deleteOneCompany(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAllCompanies = asyncHandler(async (req, res, next) => {
    const response = await readAllCompanies(req.user.companyDTO._id);
    res.status(200).json({ success: true, data: response });
})