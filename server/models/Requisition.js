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
        type: String,
        required: true,
    },
    returnDate: {
        type: Date,
        required: true,
        min: 0
    },
})

const Requisitions = mongoose.model('Requisition', RequisitionSchema);

module.exports = Requisitions;