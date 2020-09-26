const express = require('express');
const router = express.Router();
const { getAssigWorks, putAssignWork, deleteAssigWork } = require('../controllers/assing-work');
const { protect } = require('../middleware/auth');
router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/:id')
    .put(protect, putAssignWork)
    .delete(protect, deleteAssigWork);

router.route('/branch/:id')
    .get(protect, getAssigWorks)
module.exports = router;