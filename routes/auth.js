const express = require('express');
const router = express.Router();
const {
    login,
    getUserLogued,
    register,
    deleteRegister,
    validateCode,
    generateActivateCode,
    resetPassword,
    newPassword } = require('../controllers/auth');
const { protect } = require('../middleware/auth');

router.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});
router.post('/generate-code', generateActivateCode);
router.post('/validate-code', validateCode);
router.post('/register', register);
router.post('/reset-password', resetPassword);
router.post('/new-password', newPassword);

router.route('/register/:id')
    .delete(deleteRegister);

router.route('/login')
    .get(protect, getUserLogued)
    .post(login);

module.exports = router;