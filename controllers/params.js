const { readAll } = require('../services/params');
const asyncHandler = require('../middleware/async');
exports.readAll = asyncHandler(async (req, res, next) => {
    const response = await readAll();
    res.status(200).json({ success: true, data: response });
})