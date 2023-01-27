/* Models */
const Log = require('../models/log.model');

/* create */
exports.createLog = async(log) => {
    return await Log.create(log);
};