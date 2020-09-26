const { createBrand, readBrand, updateBrand, deleteBrand, realAllBrands } = require('../services/brand.js');
const asyncHandler = require('../middleware/async');
exports.createBrand = asyncHandler(async (req, res, next) => {
    const response = await createBrand(req.body);
    res.status(201).json({ success: true, data: response });
})
exports.readBrand = asyncHandler(async (req, res, next) => {
    const response = await readBrand(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.updateBrand = asyncHandler(async (req, res, next) => {
    const response = await updateBrand(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})
exports.deleteBrand = asyncHandler(async (req, res, next) => {
    const response = await deleteBrand(req.params.id);
    res.status(200).json({ success: true, data: response });
})
exports.realAllBrands = asyncHandler(async (req, res, next) => {
    const response = await realAllBrands(req.body.companyId);
    res.status(200).json({ success: true, data: response });
})