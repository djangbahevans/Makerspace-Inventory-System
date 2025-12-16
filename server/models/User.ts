import bcrypt from "bcryptjs";
import mongoose, { type HydratedDocument, type Model } from "mongoose";

const { Schema } = mongoose;

export type User = {
  name: string;
  role: string;
  username: string;
  password: string;
};

export type UserMethods = {
  verifyPassword(password: string): boolean;
};

export type UserDocument = HydratedDocument<User, UserMethods>;

export type UserModel = Model<User, Record<string, never>, UserMethods>;

const UserSchema = new Schema<User, UserModel, UserMethods>({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

UserSchema.methods.verifyPassword = function verifyPassword(
  this: UserDocument,
  password: string,
) {
  return bcrypt.compareSync(password, this.password);
};

export default mongoose.model<User, UserModel>("User", UserSchema);
