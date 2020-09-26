const express = require('express');
const router = express.Router();
const { createCard, readCard, updateCard, deleteCard, readAllCard } = require('../controllers/card');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, createCard)
    .get(protect, readAllCard);

router.route('/:id')
    .delete(protect, deleteCard)
    .get(protect, readCard)
    .put(protect, updateCard);

module.exports = router;