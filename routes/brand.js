const express = require('express');
const router = express.Router();
const { createBrand, readBrand, updateBrand, deleteBrand, realAllBrands } = require('../controllers/brand');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, createBrand)
    .get(protect, realAllBrands);

router.route('/:id')
    .put(protect, updateBrand)
    .delete(protect, deleteBrand)
    .get(protect, readBrand);

module.exports = router;