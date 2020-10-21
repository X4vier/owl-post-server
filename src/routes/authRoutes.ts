import express from "express";
import jwt from "jsonwebtoken";
import {
  emailExists,
  adventurerNameExists,
  createUser,
  getUserByEmailOrAdventurerName,
} from "../controllers";
import { isValidAdventurerName, isValidEmail, isValidPassword } from "../utils";

const router = express.Router();

router.get("/emailExists", async (req, res) => {
  const email = req.query.email as string;

  try {
    const userExists = await emailExists(email);
    return res.send({ userExists });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.get("/adventurerExists", async (req, res) => {
  const adventurerName = req.query.adventurerName as string;

  try {
    const userExists = await adventurerNameExists(adventurerName);
    return res.send({ userExists });
  } catch (err) {
    return res.status(422).send(err.message);
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, adventurerName } = req.body;

  try {
    if (!isValidAdventurerName(adventurerName))
      throw new Error("Adventurer Name is invalid");
    if (!isValidEmail(email)) throw new Error("Email is invalid");
    if (!isValidPassword(password)) throw new Error("Password is invalid");
    if (await emailExists(email)) throw new Error("Email taken");
    if (await adventurerNameExists(adventurerName))
      throw new Error("Adventurer Name taken");
    const user = await createUser({ email, password, adventurerName });
    if (!user) throw new Error("User not created");
    const token = jwt.sign({ userid: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    console.log(err);
    console.log(err.code);
    return res.status(422).send(err.message);
  }
});

router.post("/signin", async (req, res) => {
  const { uniqueId: uniqueId, password } = req.body;
  if (!uniqueId || !password) {
    return res.status(422).send({ error: "Must provide email and password" });
  }

  const user = await getUserByEmailOrAdventurerName(uniqueId);
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
