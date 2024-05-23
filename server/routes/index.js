import express from "express";
import {
  registerController,
  loginController,
  getUserInformationsByToken,
  logoutController,
} from "../controllers/index.js";
import { registerMiddleware } from "../middleware/register.js";
const router = express.Router();

router.post("/register", registerMiddleware, registerController);
router.post("/login", loginController);
router.get("/user/info", getUserInformationsByToken);
router.get("/logout", logoutController);

export default router;
