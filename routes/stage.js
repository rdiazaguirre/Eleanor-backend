const express = require('express');
const router = express.Router();
const { createStage, readStage, updateStage, deleteStage, readAllStages, deleteAllStages } = require('../controllers/stage');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/delete-all')
    .delete(protect, deleteAllStages)

router.route('/')
    .post(protect, createStage)
    .get(protect, readAllStages);

router.route('/:id')
    .delete(protect, deleteStage)
    .put(protect, updateStage)
    .get(protect, readStage);

module.exports = router;