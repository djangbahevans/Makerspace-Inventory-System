const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequisitionSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String
    },
    item: {
        type: String,
        required: true,
        min: 1
    },
    returnDate: {
        // type: Date,
        type: String,
        required: true,
        min: 0
    },
})

const Requisitions = mongoose.model('Requisition', RequisitionSchema);

module.exports = Requisitions;