import express from "express";
import jwt from "jsonwebtoken";
import {
  emailExists,
  userNameExists,
  createUser,
  getUserByEmailOrName,
  signUp,
} from "../controllers";
import { validUserName, validEmail, validPassword } from "../utils";

const router = express.Router();

router.get("/emailExists", emailExists);

router.get("/adventurerExists", userNameExists);

router.post("/signUp", signUp);

router.post("/signin", async (req, res) => {
  const { uniqueId: uniqueId, password } = req.body;
  if (!uniqueId || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await getUserByEmailOrName(uniqueId);
  if (!user) {
    return res.status(422).send({ error: "Invalid email or adventurer name." });
  }

  try {
    await user.schema.methods.comparePassword(password, user);
    const token = jwt.sign({ userid: user._id }, "MY_SECRET_KEY");
    res.send({ token, adventurerName: user.adventurerName, email: user.email });
  } catch (err) {
    return res.status(422).send({ error: "Invalid password." });
  }
});

export { router };
