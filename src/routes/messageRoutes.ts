import { Router } from "express";
import { createMessage } from "../controllers";
import { requireAuth } from "../middlewares/requireAuth";

const router = Router();
router.use(requireAuth);
router.get("/createMessage", createMessage as any);

export { router };
