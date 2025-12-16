import type { Types } from "mongoose";
import Requisition from "../models/Requisition";

const Stock = {
  requisitionHistory: async (parent: { _id: Types.ObjectId }) => {
    const requisitions = await Requisition.find({ item: parent._id });
    return requisitions;
  },
};

export default Stock;
