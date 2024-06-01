import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
const jwtSecret = process.env.JWT_SECRET;

export const registerController = async (req, res, next) => {
  const { username, password, prefferedName, genres } = req.body;
  const avatar = req.file ? req.file.filename : null; // Get the avatar file name

  try {
    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }
    bcrypt.hash(password, 10).then(async (hash) => {
      User.create({ username, password: hash, prefferedName, genres }).then(
        (user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            {
              id: user._id,
              username,
              prefferedName,
              genres,
            },
            jwtSecret,
            {
              expiresIn: maxAge, //3hrs in sec
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, //3hrs in ms
          });
          // res.cookie("username", user.username);
          res.status(201).json({
            user,
          });
        }
      );
    });
  } catch (err) {
    res.status(401).json({
      message: "User not successful created",
      error: err.mesage,
    });
  }
};
export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      res.status(401).json({ message: "User not found" });
    } else {
      bcrypt.compare(password, user.password).then((result) => {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            {
              id: user._id,
              username,
              prefferedName: user.prefferedName,
              genres: user.genres,
            },
            jwtSecret,
            {
              expiresIn: maxAge,
            }
          );
          res.cookie("jwt", token, {
            httpOnly: true,
            maxAge: maxAge * 1000, //3 hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user._id,
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occured",
      error: error.message,
    });
  }
};
export const getUserInformationsByToken = async (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "Token not provided" });
  }

  try {
    const decodedToken = jwt.verify(token, jwtSecret);
    const userId = decodedToken.id;

    // Fetch user information from the database
    const user = await User.findById(userId).select("-password"); // Exclude the password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with user information
    res.json({
      username: user.username,
      genres: user.genres,
      prefferedName: user.prefferedName,
      id: user._id,
      likedMovies: user.likedMovies,
      avatar: user.avatar,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Invalid token" });
  }
};
export const logoutController = (req, res) => {
  // Clear the JWT cookie
  res.cookie("jwt", "", {
    maxAge: 1,
    httpOnly: true, // Helps prevent cross-site scripting (XSS) attacks
    secure: process.env.NODE_ENV === "production", // Ensures cookie is sent only over HTTPS in production
    sameSite: "strict", // Helps prevent cross-site request forgery (CSRF) attacks
  });

  // Send a JSON response
  res.status(200).json({ message: "Logout successful" });
};

export const likeMovieToggle = async (req, res) => {
  const { user_id, movie_id } = req.params;

  try {
    // Find the user by ID
    const user = await User.findById(user_id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the movie is already liked by the user
    const isLiked = user.likedMovies.some(
      (likedMovie) => likedMovie.movie_id === movie_id
    );

    if (isLiked) {
      // If the movie is already liked, remove it from likedMovies (dislike)
      user.likedMovies = user.likedMovies.filter(
        (likedMovie) => likedMovie.movie_id !== movie_id
      );
    } else {
      // If the movie is not liked, add it to likedMovies (like)
      user.likedMovies.push({ movie_id, date: new Date() });
    }

    // Save the updated user document
    await user.save();

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while liking/disliking the movie" });
  }
};
