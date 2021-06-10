const { createAssuranceCompany,
    readAssuranceCompany,
    updateAssuranceCompany,
    deleteAssuranceCompany,
    readAllAssuranceCompany } = require('../services/assurance-company');
const asyncHandler = require('../middleware/async');

exports.createAssuranceCompany = asyncHandler(async (req, res, next) => {
    const response = await createAssuranceCompany(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readAssuranceCompany = asyncHandler(async (req, res, next) => {
    const response = await readAssuranceCompany(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateAssuranceCompany = asyncHandler(async (req, res, next) => {
    const response = await updateAssuranceCompany(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteAssuranceCompany = asyncHandler(async (req, res, next) => {
    const response = await deleteAssuranceCompany(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.readAllAssuranceCompany = asyncHandler(async (req, res, next) => {
    const response = await readAllAssuranceCompany(req.params.companyId);
    res.status(200).json({ success: true, data: response });
})