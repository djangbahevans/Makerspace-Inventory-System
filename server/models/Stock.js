const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: {
        type: String,
        required: true,
        // unique: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    },
    numberInStock: {
        type: Number,
        required: true,
        min: 0
    },
})

const Stock = mongoose.model('Stock', StockSchema);

module.exports = Stock;