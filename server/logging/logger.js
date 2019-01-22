const winston = require('winston');
const path = require('path');


module.exports = winston.createLogger({
    level: 'info',
    format: winston.format.prettyPrint(),
    transports: new winston.transports.File({ filename: path.join(__dirname, '..', '..', 'logfile.log') })
});