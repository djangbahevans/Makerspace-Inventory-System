const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const requisition = require('./server/api/requisition');
const stock = require('./server/api/stock');
const logger = require('./server/logging/logger');
const user = require('./server/api/user');


// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'express.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Database Connection
mongoose.connect("mongodb://localhost:27017/inventory", {
    useNewUrlParser: true
})
    .then(() => logger.info('Connected to  MongoDB'))
    .catch(() => {
        logger.info('Could not connect to MongoDB');
        process.abort();
    });

// 3rd Party Middleware 
app.use(helmet())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
    // cookie: { secure: true  }
}));
require('./server/auth/auth')(app); // After app.use(sessions)

// Routes
app.use('/api/stock', stock);
app.use('/api/requisition', requisition);
app.use('/api/user', user);

app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});

// Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
