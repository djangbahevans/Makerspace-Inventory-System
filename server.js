const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const stock = require('./server/api/stock');
const requisition = require('./server/api/requisition');
const cors = require('cors')


mongoose.connect('mongodb://localhost:27017/inventory', {
    useNewUrlParser: true
})
    .then(() => console.log('Database running'))
    .catch(() => {
        console.log('Could not connect to MongoDB');
        process.abort();
    });

// app.use(cors())
// app.use(function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/stock', stock);
app.use('/api/requisition', requisition);

app.use((req, res) => {
    res.sendFile(
        path.join(__dirname, 'public', 'index.html')
    );
});


const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is up');
});