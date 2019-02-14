const express = require('express');
const app = express();
const { ApolloServer, gql } = require('apollo-server-express'); ``
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const fs = require('fs');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const https = require('https')
const requisition = require('./server/api/requisition');
const stock = require('./server/api/stock');
const logger = require('./server/logging/logger');
const user = require('./server/api/user');
const Mutation = require('./server/resolvers/Mutation');
const Query = require('./server/resolvers/Query');
const Requisition = require('./server/resolvers/Requisition');
const Stock = require('./server/resolvers/Stock');


// Logging
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'express.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Database Connection
const URI = process.env.URI || "mongodb://localhost:27017/inventory"
mongoose.connect(URI, {
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
    secret: process.env.SessionSecret || 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    cookie: { secure: true }
}));
require('./server/auth/auth')(app); // After app.use(sessions)

// Routes
app.use('/api/stock', stock);
app.use('/api/requisition', requisition);
app.use('/api/user', user);

// Server
const server = new ApolloServer({
    typeDefs: gql`${fs.readFileSync(__dirname.concat('/server/schema/schema.graphql'), 'utf8')}`,
    resolvers: {
        Mutation,
        Query,
        Requisition,
        Stock,
    },
    playground: true,
    context: ({ req, res }) => {
        return { req, res };
    },
    debug: true
});

server.applyMiddleware({ app });

app.use((req, res) => {
    const regex = /\.\w+$/ /// Match all extensions
    if (req.url.match(regex)) return res.sendStatus(404) // if file, return 404
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});

const PORT = process.env.PORT || 8080;
https.createServer({
    cert: fs.readFileSync(path.join(__dirname, 'ssl', 'server.crt')),
    key: fs.readFileSync(path.join(__dirname, 'ssl', 'server.key')),
}, app).listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
});
