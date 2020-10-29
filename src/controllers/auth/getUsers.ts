import User from "../../models/User";

export const getUsers = async () => {
  const users = await User.find();
  return users;
};
