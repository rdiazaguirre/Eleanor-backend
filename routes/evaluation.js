const express = require('express');
const router = express.Router();
const { getEvaluations, deleteEvaluation, putEvaluation } = require('../controllers/evaluation');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/branch/:id')
    .get(protect, getEvaluations);

router.route('/:id')
    .put(protect, putEvaluation)
    .delete(protect, deleteEvaluation);
module.exports = router;