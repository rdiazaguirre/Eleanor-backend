const express = require('express');
const router = express.Router();
const { vehicleReport, realAll } = require('../controllers/vehicle-report');
const { protect } = require('../middleware/auth');

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


router.route('/:id')
    .get(protect, vehicleReport);

router.route('/')
    .get(protect, realAll);

module.exports = router;