const express = require('express');
const router = express.Router();
const { readAllMenus } = require('../controllers/menu');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .get(protect, readAllMenus);

module.exports = router;