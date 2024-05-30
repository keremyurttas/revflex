import express from "express";
import {
  registerController,
  loginController,
  getUserInformationsByToken,
  logoutController,
} from "../controllers/auths.js";
import {
  createComment,
  deleteComment,
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
router.delete("/movies/:movie_id/comments/:comment_id", deleteComment);

export default router;
