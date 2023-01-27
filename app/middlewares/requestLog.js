const logger = require('../utils/logger.utils');
const mongoose = require('mongoose');

module.exports = (req, res, next) => {
    const requestId = mongoose.Types.ObjectId();
    res.logger = logger.child({
        url: req.url,
        requestStartTime: Date.now(),
    });
    req.id = requestId;
    res.logger.info('Request started');
    next();
};