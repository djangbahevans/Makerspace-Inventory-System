const winston = require('winston');
const path = require('path');
const config = require('config')


module.exports = winston.createLogger({
    // level: config.get('LogLevel'),
    level: 'info',
    format: winston.format.prettyPrint(),
    transports: new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logfile.log') }),
    exceptionHandlers: new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'exceptions.log')})
});
