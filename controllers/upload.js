const { upload } = require('../services/upload');
const asyncHandler = require('../middleware/async');

exports.upload = asyncHandler(async (req, res, next) => {
    const response = await upload(req.body);
    res.status(200).json({ success: true, data: response });
})