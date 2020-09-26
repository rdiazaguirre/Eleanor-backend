const express = require('express');
const router = express.Router();
const { getQuotations, deleteQuotation, putQuotation, postAprove } = require('../controllers/quotation');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/aprove/:id')
    .post(protect, postAprove);

router.route('/branch/:id')
    .get(protect, getQuotations);

router.route('/:id')
    .put(protect, putQuotation)
    .delete(protect, deleteQuotation);
module.exports = router;