import express from "express";
import {
  registerController,
  loginController,
  getUserInformationsByToken,
  logoutController,
  likeMovieToggle,
} from "../controllers/auths.js";
import {
  createComment,
  deleteComment,
  getCommentsByMovieId,
  getRecentComments,
} from "../controllers/comments.js";
import { registerMiddleware } from "../middleware/register.js";
const router = express.Router();

router.post("/auth/register", registerMiddleware, registerController);
router.post("/auth/login", loginController);
router.get("/auth/user/info", getUserInformationsByToken);
router.get("/auth/logout", logoutController);
router.post("/movies/:movie_id/comments", createComment);
router.get("/movies/:movie_id/comments", getCommentsByMovieId);
router.get("/recent-comments", getRecentComments);
router.delete("/movies/:movie_id/comments/:comment_id", deleteComment);
router.patch("/:user_id/liked/:movie_id", likeMovieToggle);

export default router;
