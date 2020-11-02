import jwt from "jsonwebtoken";
import mongoose from "mongoose";

import User from "../models/User";

const requireAuth = (req: any, res: any, next: any) => {
  const { authorization } = req.headers;

  // authorization === 'Bearer lakskljsdflkjsdfl'
  if (!authorization) {
    return res.status(401).send({ error: "You must be logged in" });
  }

  const token = authorization.replace("Bearer ", "");

  if (!process.env.JWT_SECRET)
    throw new Error("JWT_SECRET environment variable not set");

  jwt.verify(token, process.env.JWT_SECRET, async (err: any, payload: any) => {
    if (err) {
      return res.status(401).send({ error: "You must be logged in." });
    }

    const { userid } = payload;

    const user = await User.findById(userid);

    req.user = user;
    next();
  });
};

export { requireAuth };
