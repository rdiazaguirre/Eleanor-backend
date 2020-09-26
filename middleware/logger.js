//@desc     Print log too console
logger = (req, res, next) => {
    console.info(`${req.method} ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

module.exports = logger;