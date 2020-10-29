import { Router } from "express";
import { emailExists, userNameExists, signUp, signIn } from "../controllers";

const router = Router();

router.get("/emailExists", emailExists);
router.get("/adventurerExists", userNameExists);
router.post("/signUp", signUp);
router.post("/signIn", signIn);

export { router };
