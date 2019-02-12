const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Stock = require('../models/Stock');
const Requisition = require('../models/Requisition');


const Query = {
    currentUser: async (parent, args, { req, res }, info) => req.user,
    user: async (parent, { id }, ctx, info) => await User.findById(id),
    users: async (parent, args, ctx, info) => await User.find({}),
    requisition: async (parent, { id }, ctx, info) => await Requisition.findById(id),
    requisitions: async (parent, { id }, ctx, info) => await Requisition.find({}),
    stock: async (parent, { id }, ctx, info) => await Stock.findById(id),
    stocks: async (parent, args, ctx, info) => await Stock.find({}),
}

module.exports = Query;