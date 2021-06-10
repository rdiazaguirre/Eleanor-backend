const { readAllMenus } = require('../services/menu');
const asyncHandler = require('../middleware/async');
exports.readAllMenus = asyncHandler(async (req, res, next) => {
    const response = await readAllMenus();
    res.status(200).json({ success: true, data: response });
})