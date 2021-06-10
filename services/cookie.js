exports.sendTokenCookie = (token, statusCode, res) => {
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 60 * 1000),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    
    res.status(statusCode)
        .cookie('token', token, options)
        .json({ success: true, token });
}