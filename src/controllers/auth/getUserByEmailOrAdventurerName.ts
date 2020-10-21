import mongoose from "mongoose";
import { IUser } from "../../types";

const User = mongoose.model<IUser>("User");

export const getUserByEmailOrAdventurerName = async (uniqueId: string) => {
  return await User.findOne({
    $or: [{ email: uniqueId }, { adventurerName: uniqueId }],
  });
};
