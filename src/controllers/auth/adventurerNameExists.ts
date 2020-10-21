import mongoose from "mongoose";
import { IUser } from "../../types";

const User = mongoose.model<IUser>("User");

export const adventurerNameExists = async (adventurerName: string) => {
  const user = await User.findOne({ adventurerName });
  return Boolean(user);
};
