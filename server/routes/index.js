import express from "express";
import {
  registerController,
  loginController,
  getUserInformationsByToken,
  logoutController,
} from "../controllers/auths.js";
import {
  createComment,
  getCommentsByMovieId,
} from "../controllers/comments.js";
import { registerMiddleware } from "../middleware/register.js";
const router = express.Router();

router.post("/auth/register", registerMiddleware, registerController);
router.post("/auth/login", loginController);
router.get("/auth/user/info", getUserInformationsByToken);
router.get("/auth/logout", logoutController);
router.post("/movies/:movie_id/comments", createComment);
router.get("/movies/:movie_id/comments", getCommentsByMovieId);

export default router;
