import mongoose from "mongoose";
import { IUser } from "../../types";

const User = mongoose.model<IUser>("User");

export const emailExists = async (email: string) => {
  const user = await User.findOne({ email });
  return Boolean(user);
};
