const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Stock = require('../models/Stock');
const Requisition = require('../models/Requisition');


const Mutation = {
    createUser: async (parent, { data }, ctx, info) => {
        let { name, role, username, password } = data;

        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error("Username already taken");

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        password = await bcrypt.hash(password, salt)

        const user = await User.create({
            name, password, role, username
        });

        // if (user) {
        //     return req.login(user, (err) => {  /// T
        //         if (err) return res.send({ error: 'Error logging in' })
        //         else return res.send(user);
        //     });
        // }
        // else return res.send({ err: 'Error creating new account' })

        return user
    },
    editUser: async (parent, { id, data }, ctx, info) => {
        const user = await User.findById(id)
        if (!user) throw new Error("User does not exist");

        if (data.password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            var password = await bcrypt.hash(data.password, salt)
            user.password = password
        }

        if (data.name) user.name = data.name
        if (data.role) user.role = data.role
        if (data.username) user.username = data.username
        await user.save();

        return user;
    },
    deleteUser: async (parent, { id }, ctx, info) => await User.findByIdAndDelete(id),
    createRequisition: async (parent, args, ctx, info) => {
        const { name, role, item, returnDate } = args.data;

        const stock = await Stock.findById(item); // Ensure item exists
        if (!stock) throw new Error("Item does not exist")

        let { numberInStock } = stock;
        if (!numberInStock) throw new Error('The specified item is not in stock');

        stock.numberInStock = --numberInStock;
        const requisition = new Requisition({
            name,
            role,
            item: stock,
            returnDate
        });
        requisition = await requisition.save();
        await stock.save();

        return requisition
    },
    editRequisition: async (parent, { id, data }, ctx, info) => {
        const { role, item, returnDate } = data;
        let requisition = await Requisition.findById(id);

        // Increment former item
        let oldStock = await Stock.findById(requisition.item._id);
        ++oldStock.numberInStock;
        oldStock.save();

        // Decrement current item
        let newStock = await Stock.findOne({ name: item });
        --newStock.numberInStock;
        await newStock.save();

        // Editing requisition
        requisition.item = newStock;
        requisition.role = role;
        requisition.returnDate = returnDate;
        requisition.save();

        return requisition;
    },
    deleteRequisition: async (parent, { id }, ctx, info) => await Requisition.findByIdAndDelete(id),
    createStock: async (parent, { data }, ctx, info) => {
        const { name, quantity, numberInStock } = data;
        if (!numberInStock) numberInStock = quantity;

        let stock = new Stock({
            name,
            quantity,
            numberInStock
        })
        await stock.save()
        return stock;
    },
    editStock: async (parent, { id, data }, ctx, info) => {
        const { quantity, numberInStock } = data;
        const stock = await Stock.findByIdAndUpdate(id, {
            quantity, numberInStock
        });
        if (stock) return stock
    },
    deleteStock: async (parent, { id }, ctx, info) => await Stock.findByIdAndDelete(id),
}

module.exports = Mutation;