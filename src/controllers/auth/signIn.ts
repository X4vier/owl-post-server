import User from "../../models/User";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const signIn = async (req: Request, res: Response) => {
  const { uniqueId: uniqueId, password } = req.body;
  if (!uniqueId)
    return res.status(422).send({ error: "UniqueId not provided" });
  if (!password)
    return res.status(422).send({ error: "Password not provided." });

  const user = await User.findOne({
    $or: [{ email: uniqueId }, { name: uniqueId }],
  });
  if (!user) {
    return res.status(422).send({ error: "User not found" });
  }

  try {
    await user.schema.methods.comparePassword(password, user);
    const token = jwt.sign({ userid: user._id }, "MY_SECRET_KEY");
    res.send({ token, name: user.name, email: user.email });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password." });
  }
};

export { signIn };
