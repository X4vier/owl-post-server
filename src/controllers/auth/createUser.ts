import User from "../../models/User";

type userInput = {
  email: string;
  password: string;
  adventurerName: string;
};
export const createUser = async ({
  email,
  password,
  adventurerName,
}: userInput) => {
  const user = new User({ email, password, adventurerName });
  await user.save();
  return user;
};
