const express = require('express');
const router = express.Router();
const { createProfile, readProfile, updateProfile, deleteProfile, readAllProfile } 
= require('../controllers/profile');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

router.route('/')
    .post(protect, createProfile)
    .get(protect, readAllProfile);

router.route('/:id')
    .put(protect, updateProfile)
    .delete(protect, deleteProfile)
    .get(protect, readProfile);
module.exports = router;