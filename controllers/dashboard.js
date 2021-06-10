const { taskPerfomance, completedTask, executionWorks, workersRankingTask, metrics } = require('../services/dashboard');
const asyncHandler = require('../middleware/async');

exports.taskPerfomance = asyncHandler(async (req, res, next) => {
    const response = await taskPerfomance(req.body);
    res.status(200).json({ success: true, data: response });
})

exports.completedTask = asyncHandler(async (req, res, next) => {
    const response = await completedTask(req.body);
    res.status(200).json({ success: true, data: response });
})

exports.executionWorks = asyncHandler(async (req, res, next) => {
    const response = await executionWorks(req.body);
    res.status(200).json({ success: true, data: response });
})

exports.workersRankingTask = asyncHandler(async (req, res, next) => {
    const response = await workersRankingTask(req.body);
    res.status(200).json({ success: true, data: response });
})

exports.metrics = asyncHandler(async (req, res, next) => {
    const response = await metrics(req.body);
    res.status(200).json({ success: true, data: response });
})