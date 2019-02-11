const Requisition = require('../models/Requisition');


const Stock = {
    requisitionHistory: async (parent, args, ctx, info) => {
        const requisitions = await Requisition.find({ item: parent._id });
        return requisitions;
    }
}