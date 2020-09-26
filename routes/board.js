const express = require('express');
const router = express.Router();
const { createBoard, readBoard, deleteBoard, updateBoard, readAllBoard, readBoards } = require('../controllers/board');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});


router.route('/')
    .get(protect, readBoards)
    .post(protect, createBoard);

router.route('/:id')
    .delete(protect, deleteBoard)
    .get(protect, readBoard)
    .put(protect, updateBoard);

router.route('/branch/:id')
    .get(protect, readAllBoard);
module.exports = router;