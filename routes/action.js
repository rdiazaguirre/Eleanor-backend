const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { create, read, update, deleteOne, readAll } = require('../controllers/action');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, create)
    .get(protect, readAll);

router.route('/:id')
    .put(protect, update)
    .delete(protect, deleteOne)
    .get(protect, read);
module.exports = router;