const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { taskPerfomance, completedTask, executionWorks, workersRankingTask, metrics } = require('../controllers/dashboard');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/task-perfomance')
    .post(protect, taskPerfomance);

router.route('/completed-task')
    .post(protect, completedTask);

router.route('/execution-works')
    .post(protect, executionWorks);

router.route('/metrics')
    .post(protect, metrics);

router.route('/workers-ranking-task')
    .post(protect, workersRankingTask);

module.exports = router;