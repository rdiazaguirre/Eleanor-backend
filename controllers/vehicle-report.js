const { vehicleReport, realAll } = require('../services/vehicle-report');
const asyncHandler = require('../middleware/async');

exports.vehicleReport = asyncHandler(async(req, res, next) => {
    const response = await vehicleReport(req.user);
    res.status(200).json({ success: true, data: response });
})


exports.realAll = asyncHandler(async(req, res, next) => {
    const response = await realAll();
    res.status(200).json({ success: true, data: response });
})