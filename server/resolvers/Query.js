const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Stock = require('../models/Stock');
const Requisition = require('../models/Requisition');


const Query = {
    currentUser: async (parent, args, ctx, info) => { },
    user: async (parent, { id }, ctx, info) => {
        const user = await User.findById(id);
        return user
    },
    users: async (parent, args, ctx, info) => {
        return await User.find({});
    },
    requisition: async (parent, { id }, ctx, info) => {
        return await Requisition.findById(id);
    },
    requisitions: async (parent, { id }, ctx, info) => {
        return await Requisition.find({})
    },
    stock: async (parent, { id }, ctx, info) => {
        return await Stock.findById(id);
    },
    stocks: async (parent, { id }, ctx, info) => {
        return await Stock.find({});
    },
}

module.exports = Query;