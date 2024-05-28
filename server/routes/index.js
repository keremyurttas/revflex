import express from "express";
import {
  registerController,
  loginController,
  getUserInformationsByToken,
  logoutController,
} from "../controllers/auths.js";
import { createComment } from "../controllers/comments.js";
import { registerMiddleware } from "../middleware/register.js";
const router = express.Router();

router.post("/auth/register", registerMiddleware, registerController);
router.post("/auth/login", loginController);
router.get("/auth/user/info", getUserInformationsByToken);
router.get("/auth/logout", logoutController);
router.post("/movies/:movieId/comments", createComment);

export default router;
