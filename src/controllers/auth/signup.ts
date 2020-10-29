import { Request, Response } from "express";
import { validUserName, validPassword, validEmail } from "../../utils";
import User from "../../models/User";
import jwt from "jsonwebtoken";
const signUp = async (
  req: Request<{}, {}, { email: string; password: string; name: string }>,
  res: Response
) => {
  const { email, password, name } = req.body;

  try {
    if (!email) throw new Error("Email was not provided.");
    if (!password) throw new Error("Email was not provided.");
    if (!name) throw new Error("User name was not provided.");
    if (!validUserName(name)) throw new Error("User name is invalid");
    if (!validEmail(email)) throw new Error("Email is invalid");
    if (!validPassword(password)) throw new Error("Password is invalid");

    if (await User.findOne({ email })) throw new Error("Email taken");
    if (await User.findOne({ name })) throw new Error("Adventurer Name taken");
    // TODO: try comment out the above lines

    const user = new User({ email, password, name });
    await user.save();
    const token = jwt.sign({ userid: user._id }, "MY_SECRET_KEY");
    return res.send({ token });
  } catch (err) {
    console.log(err);
    console.log(err.code);
    return res.status(422).send(err.message);
  }
};

export { signUp };
