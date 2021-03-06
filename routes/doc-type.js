const express = require('express');
const router = express.Router();
const { createDocType, readDocType, updateDocType, deleteDocType, readAllDocType } = require('../controllers/doc-type');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, createDocType)
    .get(protect, readAllDocType);

router.route('/:id')
    .put(protect, updateDocType)
    .delete(protect, deleteDocType)
    .get(protect, readDocType);

module.exports = router;