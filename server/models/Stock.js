const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const StockSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
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
    requisitionHistory: [{
        type: Schema.Types.ObjectId,
        ref: 'requisition'
    }]
})

const Stocks = mongoose.model('Stock', StockSchema);

module.exports = Stocks;