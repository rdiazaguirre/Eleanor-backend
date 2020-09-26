const express = require('express');
const router = express.Router();
const { createWorker, readWorker, updateWorker, deleteWorker, realAllWorkers } = require('../controllers/worker');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


router.route('/')
    .post(protect, createWorker)
    .get(protect, realAllWorkers);

router.route('/:id')
    .put(protect, updateWorker)
    .delete(protect, deleteWorker)
    .get(protect, readWorker);
module.exports = router;