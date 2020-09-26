const errorHandler = (err, req, res, next) => {
    console.error(err.stack.red);
    res.status(err.statusCode || 500).json({
        success: false,
        data: `${err.name}: ${err.message}` || 'Server Error'
    });
}

module.exports = errorHandler;