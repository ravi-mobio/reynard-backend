require('dotenv').config();
const logger = require('./app/utils/logger.utils');
const PORT = process.env.PORT || 8000;
const app = require('./app/server');

module.exports = app.listen(PORT, () => {
    logger.info('server is running on port %s', PORT);
});