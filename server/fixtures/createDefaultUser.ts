import bcrypt from "bcryptjs";
import User from "../models/User";

type CreateDefaultUserInput = {
  name: string;
  role: string;
  username: string;
  password: string;
};

export default async function createDefaultUser(
  data: CreateDefaultUserInput,
): Promise<void> {
  let { name, role, username, password } = data;

  const existingUser = await User.findOne({ username });
  if (existingUser) throw new Error("Username already taken");

  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  password = await bcrypt.hash(password, salt);

  await User.create({
    name,
    password,
    role,
    username,
  });
}
