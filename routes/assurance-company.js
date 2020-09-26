const express = require('express');
const router = express.Router();
const { createAssuranceCompany,
    readAssuranceCompany,
    updateAssuranceCompany,
    deleteAssuranceCompany,
    readAllAssuranceCompany } = require('../controllers/assurance-company');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, createAssuranceCompany)
    .get(protect, readAllAssuranceCompany);

router.route('/:id')
    .delete(protect, deleteAssuranceCompany)
    .put(protect, updateAssuranceCompany)
    .get(protect, readAssuranceCompany);


module.exports = router;