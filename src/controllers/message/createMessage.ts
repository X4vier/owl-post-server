import { Request, Response } from "express";
import Message from "../../models/Message";
import User from "../../models/User";
import { IUser } from "../../types";

const createMessage = async (
  req: Request<{ user: IUser }, {}, { to: string; text: string }> & {
    user: IUser;
  },
  res: Response
) => {
  const { to, text } = req.body;
  const from = req.user._id;

  try {
    if (!(await User.findOne({ _id: to })))
      throw new Error("Recipient does not exist");

    const message = new Message({ to, from, text });
    await message.save();
    return res.send({ message });
  } catch (err) {
    console.log(err);
    console.log(err.code);
    return res.status(422).send(err.message);
  }
};

export { createMessage };
