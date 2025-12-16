import type { Request, Response } from "express";
import moment from "moment";
import Requisition from "../models/Requisition";
import Stock from "../models/Stock";
import User from "../models/User";

export type GraphQLContext = {
  req: Request;
  res: Response;
};

const Query = {
  currentUser: async (
    _parent: unknown,
    _args: unknown,
    { req }: GraphQLContext,
  ) => req.user,
  user: async (_parent: unknown, { id }: { id: string }) =>
    await User.findById(id),
  users: async () => await User.find({}),
  requisition: async (_parent: unknown, { id }: { id: string }) =>
    await Requisition.findById(id),
  requisitions: async () => {
    const requisitions = await Requisition.find({});
    return requisitions.map((requisition) => ({
      ...requisition.toObject(),
      returnDate: moment(requisition.returnDate).format("YYYY-MM-DD"),
    }));
  },
  stock: async (_parent: unknown, { id }: { id: string }) =>
    await Stock.findById(id),
  stocks: async () => await Stock.find({}),
};

export default Query;
