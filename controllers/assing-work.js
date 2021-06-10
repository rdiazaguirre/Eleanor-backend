const { getAllAssigWorks, removeAssigWork, updateAssigWork } = require('../services/assign-work');
const asyncHandler = require('../middleware/async');

exports.getAssigWorks = asyncHandler(async (req, res, next) => {
    const response = await getAllAssigWorks(req.body.companyId, req.params.id);
    res.status(200).json({ success: true, data: response });
})

exports.putAssignWork = asyncHandler(async (req, res, next) => {
    const response = await updateAssigWork(req.params.id, req.body);
    res.status(200).json({ success: true, data: response });
})

exports.deleteAssigWork = asyncHandler(async (req, res, next) => {
    const response = await removeAssigWork(req.params.id);
    res.status(200).json({ success: true, data: response });
})