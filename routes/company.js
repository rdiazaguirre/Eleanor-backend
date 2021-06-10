const express = require('express');
const router = express.Router();
const { createCompany, readCompany, updateCompany, deleteOneCompany, readAllCompanies } = require('../controllers/company');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, createCompany)
    .get(protect, readAllCompanies);

router.route('/:id')
    .put(protect, updateCompany)
    .get(protect, readCompany)
    .delete (protect, deleteOneCompany);
module.exports = router;