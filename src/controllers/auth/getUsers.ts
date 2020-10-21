import mongoose from "mongoose";
import { IUser } from "../../types";

const User = mongoose.model<IUser>("User");

export const getUsers = async () => {
  const users = await User.find();
  return users;
};
