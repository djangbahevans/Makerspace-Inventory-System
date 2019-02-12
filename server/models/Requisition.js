const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequisitionSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    role: {
        type: String
    },
    item: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Stock'
    },
    date: {
        type: Date,
        default: Date.now()
    },
    returnDate: {
        type: Date,
        required: true,
    },
    actualReturnDate: {
        type: Date
    },
})

const Requisitions = mongoose.model('Requisition', RequisitionSchema);

module.exports = Requisitions;