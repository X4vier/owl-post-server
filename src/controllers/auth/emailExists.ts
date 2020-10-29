import { Request, Response } from "express";
import User from "../../models/User";

export const emailExists = async (
  req: Request<{}, {}, { email?: string }>,
  res: Response
) => {
  const email = req.body?.email;
  if (!email) {
    return res.status(400).send("email address not provided");
  }
  try {
    const user = await User.findOne({ email });
    res.status(200).send(Boolean(user));
  } catch (error) {
    console.warn(error);
    res.status(500).send("internal server error");
    throw error;
  }
};
