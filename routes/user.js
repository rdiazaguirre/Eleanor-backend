const express = require('express');
const router = express.Router();
const { create, read, update, deleteOne, realAll, getUserMenu, getNewUser, getUserCard } = require('../controllers/user');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/new')
    .get(protect, getNewUser);

router.route('/')
    .post(protect, create)
    .get(protect, realAll);

router.route('/:id')
    .put(protect, update)
    .delete(protect, deleteOne)
    .get(protect, read);

router.route('/:id/menu')
    .get(getUserMenu)

router.route('/:id/card')
    .get(protect, getUserCard)
module.exports = router;