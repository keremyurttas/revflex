import express from "express";
import multer from "multer";
import {
  registerController,
  loginController,
  getUserInformationsByToken,
  logoutController,
  likeMovieToggle,
  getAvatarById,
  updateAvatarController,
  getLikedMoviesIds,
} from "../controllers/auths.js";
import {
  createComment,
  deleteComment,
  getCommentsByMovieId,
  getRecentComments,
  getCommentsByUserId,
} from "../controllers/comments.js";
import { registerMiddleware } from "../middleware/register.js";
import { authenticateToken } from "../middleware/authenticateToken.js";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post(
  "/auth/register",
  upload.single("avatar"),
  registerMiddleware,
  registerController
);
router.post(
  "/users/update-avatar",
  authenticateToken,
  upload.single("avatar"),
  updateAvatarController
);
router.post("/auth/login", loginController);
router.get("/auth/user/info", authenticateToken, getUserInformationsByToken);
router.get("/auth/logout", authenticateToken, logoutController);
router.post("/movies/:movie_id/comments", authenticateToken, createComment);
router.get("/movies/:movie_id/comments", getCommentsByMovieId);
router.get("/:user_id/comments",authenticateToken, getCommentsByUserId);
router.get("/recent-comments", getRecentComments);
router.delete(
  "/movies/:movie_id/comments/:comment_id",
  authenticateToken,
  deleteComment
);
router.patch("/:user_id/liked/:movie_id", authenticateToken, likeMovieToggle);
router.get("/:user_id/liked", authenticateToken, getLikedMoviesIds);
router.get("/avatars/:userId", getAvatarById);

export default router;
