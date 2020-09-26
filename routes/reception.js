const express = require('express');
const router = express.Router();
const {
    getNewReception,
    getReception,
    getReceptions,
    putReception,
    deleteReception,
    postReception } = require('../controllers/reception');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


router.route('/new')
    .get(protect, getNewReception);

router.route('/')
    .post(protect, postReception);

router.route('/branch/:id')
    .get(protect, getReceptions)

router.route('/:id')
    .get(protect, getReception)
    .put(protect, putReception)
    .delete(protect, deleteReception);

module.exports = router;