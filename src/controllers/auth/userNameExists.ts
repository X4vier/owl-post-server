import mongoose from "mongoose";
import User from "../../models/User";
import { Request, Response } from "express";

export const userNameExists = async (
  req: Request<{}, {}, { userName?: string }>,
  res: Response
) => {
  const userName = req.body?.userName;
  if (!userName) {
    return res.status(400).send("email address not provided");
  }
  try {
    const user = await User.findOne({ name: userName });
    res.status(200).send(Boolean(user));
  } catch (error) {
    console.warn(error);
    res.status(500).send("internal server error");
    throw error;
  }
};
