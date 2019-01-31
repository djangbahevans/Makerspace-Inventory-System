const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stock = require('./server/api/stock');
const requisition = require('./server/api/requisition');
const morgan = require('morgan');
const fs = require('fs');
const logger = require('./server/logging/logger');
const helmet = require('helmet');


const accessLogStream = fs.createWriteStream(path.join(__dirname, 'express.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

mongoose.connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true
})
    .then(() => logger.info('Database running'))
    .catch(() => {
        logger.info('Could not connect to MongoDB');
        process.abort();
    });


app.use(helmet())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/stock', stock);
app.use('/api/requisition', requisition);

app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});


const PORT = 8080;
app.listen(PORT, () => {
    logger.info('Server is up');
});