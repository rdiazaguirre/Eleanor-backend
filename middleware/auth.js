const jwt = require('jsonwebtoken');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../class/errorResponse');
const { read } = require('../services/user');

exports.protect = asyncHandler(async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return next(new ErrorResponse('Unauthorized', 401));
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await read(decode.id);
        if (!req.user) {
            return next(new ErrorResponse('Unauthorized', 401));
        }
        if (!req.user.companyDTO) {
            return next(new ErrorResponse('User does not have company', 500));
        }
        req.user.companyId = req.user.companyDTO._id;
        req.body.companyId = req.user.companyDTO._id;
        req.body.createdBy = req.user._id;
        next();
    } catch (error) {
        return next(new ErrorResponse('Unauthorized', 401));
    }
});