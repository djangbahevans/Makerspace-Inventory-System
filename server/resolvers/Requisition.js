const User = require('../models/User');
const Stock = require('../models/Stock');


const Requisition = {
    item: async (parent, args, ctx, info) => {
        return await Stock.findById(parent.item);
    },
}

module.exports = Requisition;