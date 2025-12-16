import mongoose, {
  type HydratedDocument,
  type Model,
  type Types,
} from "mongoose";

const { Schema } = mongoose;

export type Stock = {
  name: string;
  quantity: number;
  numberInStock: number;
  requisitionHistory: Types.ObjectId[];
};

export type StockDocument = HydratedDocument<Stock>;

export type StockModel = Model<Stock>;

const StockSchema = new Schema<Stock>({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  numberInStock: {
    type: Number,
    required: true,
    min: 0,
  },
  requisitionHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: "requisition",
    },
  ],
});

export default mongoose.model<Stock, StockModel>("Stock", StockSchema);
