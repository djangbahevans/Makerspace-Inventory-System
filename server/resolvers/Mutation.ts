import bcrypt from "bcryptjs";
import type { Express } from "express";
import moment from "moment";
import passport from "passport";
import Requisition from "../models/Requisition";
import Stock from "../models/Stock";
import User from "../models/User";
import type { GraphQLContext } from "./Query";

type EditUserInput = Partial<{
  name: string;
  role: string;
  username: string;
  password: string;
}>;

type CreateRequisitionInput = {
  name: string;
  item: string;
  role?: string;
  returnDate: string;
};

type EditRequisitionInput = Partial<{
  role: string;
  returnDate: string;
  actualReturnDate: string;
}>;

type CreateStockInput = {
  name: string;
  quantity: number;
  numberInStock?: number;
};

type EditStockInput = Partial<{
  quantity: number;
  numberInStock: number;
}>;

const Mutation = {
  login: async (
    _parent: unknown,
    { password, username }: { username: string; password: string },
    { req }: GraphQLContext,
  ) => {
    return await new Promise((resolve, reject) => {
      passport.authenticate("local", (err: unknown, user: unknown) => {
        if (err) return reject(err);
        if (!user) return reject(new Error("Invalid username or password"));

        req.login(user as Express.User, (loginErr: unknown) => {
          if (loginErr) return reject(loginErr);
          resolve(user);
        });
      })({ body: { username, password } });
    });
  },

  logout: async (_parent: unknown, _args: unknown, { req }: GraphQLContext) => {
    const user = req.user ?? null;
    await new Promise<void>((resolve, reject) => {
      req.logout((err: unknown) => {
        if (err) return reject(err);
        resolve();
      });
    });
    return user;
  },

  createUser: async (
    _parent: unknown,
    {
      data,
    }: {
      data: { name: string; role: string; username: string; password: string };
    },
  ) => {
    let { name, role, username, password } = data;

    const existingUser = await User.findOne({ username });
    if (existingUser) throw new Error("Username already taken");

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    password = await bcrypt.hash(password, salt);

    return await User.create({
      name,
      password,
      role,
      username,
    });
  },

  editUser: async (
    _parent: unknown,
    { id, data }: { id: string; data: EditUserInput },
  ) => {
    const user = await User.findById(id);
    if (!user) throw new Error("User does not exist");

    if (data.password) {
      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      user.password = await bcrypt.hash(data.password, salt);
    }

    if (data.name) user.name = data.name;
    if (data.role) user.role = data.role;
    if (data.username) user.username = data.username;
    await user.save();

    return user;
  },

  deleteUser: async (_parent: unknown, { id }: { id: string }) => {
    const user = await User.findByIdAndDelete(id);
    if (!user) throw new Error("User does not exist");
    return user;
  },

  createRequisition: async (
    _parent: unknown,
    { data }: { data: CreateRequisitionInput },
  ) => {
    const { name, role, item, returnDate } = data;

    // return date string in format YYYY-MM-DD
    const returnDateAsDate = moment(returnDate, "YYYY-MM-DD").toDate();

    // NOTE: this code currently treats `item` as a stock name (even though schema says ID)
    const stock = await Stock.findOne({ name: item });
    if (!stock) throw new Error("Item does not exist");

    let { numberInStock } = stock;
    if (!numberInStock) throw new Error("The specified item is not in stock");

    stock.numberInStock = --numberInStock;
    let requisition = new Requisition({
      name,
      role,
      item: stock,
      returnDate: returnDateAsDate,
    });

    requisition = await requisition.save();

    stock.requisitionHistory.push(requisition._id);
    await stock.save();

    return {
      _id: requisition._id,
      name,
      role,
      item: stock,
      returnDate: moment(returnDateAsDate).format("YYYY-MM-DD"),
    };
  },

  editRequisition: async (
    _parent: unknown,
    { id, data }: { id: string; data: EditRequisitionInput },
  ) => {
    const { role, returnDate, actualReturnDate } = data;
    const requisition = await Requisition.findById(id);

    if (!requisition) throw new Error("Requisition not found");

    if (role !== undefined) requisition.role = role;
    if (returnDate) {
      requisition.returnDate = moment(returnDate, "YYYY-MM-DD").toDate();
    }
    if (actualReturnDate) {
      requisition.actualReturnDate = moment(
        actualReturnDate,
        "YYYY-MM-DD",
      ).toDate();
    }

    await requisition.save();

    return requisition;
  },

  deleteRequisition: async (_parent: unknown, { id }: { id: string }) => {
    const requisition = await Requisition.findByIdAndDelete(id);
    if (!requisition) throw new Error("Requisition not found");

    const stock = await Stock.findById(requisition.item);
    if (stock && !requisition.actualReturnDate) {
      ++stock.numberInStock;
    }

    if (stock) {
      stock.requisitionHistory = stock.requisitionHistory.filter(
        (reqId) => !reqId.equals(id),
      );
      await stock.save();
    }

    return requisition;
  },

  createStock: async (
    _parent: unknown,
    { data }: { data: CreateStockInput },
  ) => {
    let { name, quantity, numberInStock } = data;
    if (numberInStock === undefined || numberInStock === null)
      numberInStock = quantity;

    const stock = new Stock({
      name,
      quantity,
      numberInStock,
    });

    await stock.save();
    return stock;
  },

  editStock: async (
    _parent: unknown,
    { id, data }: { id: string; data: EditStockInput },
  ) => {
    let { quantity, numberInStock } = data;
    const stock = await Stock.findById(id);
    if (!stock) throw new Error("Stock not found");

    quantity = quantity !== undefined ? quantity : stock.quantity;
    numberInStock =
      numberInStock !== undefined ? numberInStock : stock.numberInStock;

    if (quantity < numberInStock) {
      throw new Error("Quantity cannot be less that number in stock");
    }

    stock.quantity = quantity;
    stock.numberInStock = numberInStock;

    await stock.save();
    return stock;
  },

  deleteStock: async (_parent: unknown, { id }: { id: string }) => {
    const stock = await Stock.findById(id);
    if (!stock) throw new Error("Stock not found");

    await Promise.all(
      stock.requisitionHistory.map((requisitionId) =>
        Requisition.findByIdAndDelete(requisitionId).exec(),
      ),
    );

    await stock.deleteOne();
    return stock;
  },
};

export default Mutation;
