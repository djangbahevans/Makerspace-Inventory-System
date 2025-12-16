import mongoose, {
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";

const { Schema } = mongoose;

export type Requisition = {
  name: string;
  role?: string;
  item: Types.ObjectId;
  date: Date;
  returnDate: Date;
  actualReturnDate?: Date;
};

export type RequisitionDocument = HydratedDocument<Requisition>;

export type RequisitionModel = Model<Requisition>;

const RequisitionSchema = new Schema<Requisition>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  item: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Stock",
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  returnDate: {
    type: Date,
    required: true,
  },
  actualReturnDate: {
    type: Date,
  },
});

export default mongoose.model<Requisition, RequisitionModel>(
  "Requisition",
  RequisitionSchema,
);
