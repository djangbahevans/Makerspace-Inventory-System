import type { Types } from "mongoose";
import Stock from "../models/Stock";

const Requisition = {
  item: async (parent: { item: Types.ObjectId }) => {
    return await Stock.findById(parent.item);
  },
};

export default Requisition;
