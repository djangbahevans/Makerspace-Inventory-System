const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');
const Stock = require('../models/Stock');
const Requisition = require('../models/Requisition');
const moment = require('moment')


const Mutation = {
    login: async (parent, { password, username }, { req, res }, info) => {
        return new Promise((resolve, reject) => {
            passport.authenticate('local', (err, user) => {
                if (err) reject(err);
                if (!user) reject('Invalid credentials.');

                req.login(user, () => resolve(user));
            })({ body: { username, password } });
        });
    },
    logout: async (parent, args, {
        req
    }, info) => req.logout(),
    createUser: async (parent, { data }, { req, res }, info) => {
        let { name, role, username, password } = data;

        const existingUser = await User.findOne({ username });
        if (existingUser) throw new Error("Username already taken");

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        password = await bcrypt.hash(password, salt);

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

        return user;
    },
    editUser: async (parent, { id, data }, ctx, info) => {
        const user = await User.findById(id);
        if (!user) throw new Error("User does not exist");

        if (data.password) {
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);
            var password = await bcrypt.hash(data.password, salt);
            user.password = password;
        }

        if (data.name) user.name = data.name;
        if (data.role) user.role = data.role;
        if (data.username) user.username = data.username;
        await user.save();

        return user;
    },
    deleteUser: async (parent, { id }, ctx, info) => {
        const user = await User.findByIdAndDelete(id);
        if (!user) throw new Error("User does not exist");
        return user;
    },
    createRequisition: async (parent, args, ctx, info) => {
        let { name, role, item, returnDate } = args.data;

        // return date string in format YYYY-MM-DD;
        returnDate = moment(returnDate, "YYYY-MM-DD").toDate()

        // const stock = await Stock.findById(item); // Ensure item exists
        const stock = await Stock.findOne({name: item})
        if (!stock) throw new Error("Item does not exist");

        let { numberInStock } = stock;
        if (!numberInStock) throw new Error('The specified item is not in stock');

        stock.numberInStock = --numberInStock;
        let requisition = new Requisition({
            name,
            role,
            item: stock,
            returnDate
        });

        requisition = await requisition.save();

        stock.requisitionHistory.push(requisition._id);
        await stock.save();

        requisition.returnDate = moment(returnDate).format("YYYY-MM-DD")

        return requisition;
    },
    editRequisition: async (parent, { id, data }, ctx, info) => {
        const { role, item, returnDate, actualReturnDate } = data;
        let requisition = await Requisition.findById(id);

        if (!requisition) throw new Error("Requisition not found");

        requisition.role = role;
        requisition.returnDate = returnDate;
        if (actualReturnDate) requisition.actualReturnDate = actualReturnDate;

        requisition.save();

        return requisition;
    },
    deleteRequisition: async (parent, { id }, ctx, info) => {
        const requisition = await Requisition.findByIdAndDelete(id);
        if (!requisition) throw new Error("Requisition not found");

        let stock = await Stock.findById(requisition.item);

        if (!requisition.actualReturnDate)++stock.numberInStock; // Increase Stock numberInStock Count

        // Add requisition to Stock requisitionHistory
        // const { _id, item, ...requisitionHistory } = requisition._doc;
        // requisitionHistory.actualReturnDate = new Date();
        // stock.requisitionHistory.push(requisitionHistory);

        stock.requisitionHistory = stock.requisitionHistory.filter(req => !req.equals(id));

        await stock.save();
        return requisition;
    },
    createStock: async (parent, { data }, ctx, info) => {
        let { name, quantity, numberInStock } = data;
        if (!numberInStock) numberInStock = quantity;

        let stock = new Stock({
            name,
            quantity,
            numberInStock
        });

        try {
            await stock.save();
        } catch (error) {
            throw error;
        }

        return stock;
    },
    editStock: async (parent, { id, data }, ctx, info) => {
        let { quantity, numberInStock } = data;
        const stock = await Stock.findById(id);

        quantity = quantity !== undefined ? quantity : stock.quantity
        numberInStock = numberInStock !== undefined ? numberInStock : stock.numberInStock

        if (!stock) throw new Error("Stock not found");
        if (quantity < numberInStock) throw new Error("Quantity cannot be less that number in stock");

        stock.quantity = quantity
        stock.numberInStock = numberInStock

        try {
            await stock.save();
        } catch (error) {
            throw error;
        }

        return stock;
    },
    deleteStock: async (parent, { id }, ctx, info) => {
        const stock = await Stock.findById(id);
        if (!stock) throw new Error("Stock not found");

        stock.requisitionHistory.map(requisition => {
            Requisition.findByIdAndDelete(requisition);
        });

        await stock.remove();
        return stock;
    },
};

module.exports = Mutation;