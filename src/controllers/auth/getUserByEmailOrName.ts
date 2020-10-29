import User from "../../models/User";

export const getUserByEmailOrName = async (uniqueId: string) => {
  return await User.findOne({
    $or: [{ email: uniqueId }, { adventurerName: uniqueId }],
  });
};
