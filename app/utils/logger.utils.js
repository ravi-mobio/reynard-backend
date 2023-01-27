const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf, colorize, prettyPrint, errors, splat } = format;

const myFormat = printf(({ level, message, timestamp, stack, url }) => {
    return `${level} : ${url ?? ''} ${timestamp} ${message} ${stack ?? ''}`;
});

const loggerMain = () => {
    return createLogger({
        level: 'info',
        format: combine(
            colorize(),
            splat(), // Necessary to produce the 'meta' property
            timestamp(),
            prettyPrint(),
            errors({ stack: true }) // <-- use errors format
        ),
        transports: [
            new transports.Console({
                expressFormat: true,
                format: myFormat
            })
        ]
    });
};

let logger = loggerMain();

module.exports = logger;
