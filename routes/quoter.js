const express = require('express');
const router = express.Router();
const { createQuoter, readQuoter, updateQuoter, deleteQuoter, readAllQuoter } = require('../controllers/quoter');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, createQuoter)
    .get(protect, readAllQuoter);

router.route('/:id')
    .put(protect, updateQuoter)
    .delete(protect, deleteQuoter)
    .get(protect, readQuoter);
module.exports = router;