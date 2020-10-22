import { Request, Response } from "express";
import {}
const signup = async (
  req: Request<{}, {}, { email: string; password: string; userName: string }>,
  res: Response
) => {
  const { email, password, userName } = req.body;

  try {
    if (!isValidUserName(userName))
      throw new Error("Adventurer Name is invalid");
    if (!isValidEmail(email)) throw new Error("Email is invalid");
    if (!isValidPassword(password)) throw new Error("Password is invalid");
    if (await emailExists(email)) throw new Error("Email taken");
    if (await userNameExists(userName))
      throw new Error("Adventurer Name taken");
    const user = await createUser({ email, password, userName });
    if (!user) throw new Error("User not created");
    const token = jwt.sign({ userid: user._id }, "MY_SECRET_KEY");
    res.send({ token });
  } catch (err) {
    console.log(err);
    console.log(err.code);
    return res.status(422).send(err.message);
  }
};
