import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

const jwtSecret = process.env.JWT_SECRET;

export const registerController = async (req, res, next) => {
  try {
    const { username, password, prefferedName, genres } = req.body;

    if (!username || !password || !prefferedName || !genres) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const isUsernameExist = await User.findOne({ username });
    if (isUsernameExist) {
      return res.status(409).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
      prefferedName,
      genres,
    });

    if (req.file) {
      user.avatar = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      };
    }
    await user.save();

    const maxAge = 3 * 60 * 60;
    const token = jwt.sign(
      {
        id: user._id,
        username,
        prefferedName,
        genres: JSON.parse(genres),
      },
      jwtSecret,
      {
        expiresIn: maxAge,
      }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Lax",
      maxAge: maxAge * 1000,
      path: "/",
    });

    res.status(201).json({
      user,
    });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).json({
      message: "An error occurred during user registration",
      error: err.message,
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
            secure: true,
            sameSite: "None",
            maxAge: maxAge * 1000,
            path: "/",
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

export const updateAvatarController = async (req, res) => {
  const userId = req.user.id; // Assuming user ID is added to req.user by authenticateToken middleware

  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        avatar: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      },
      { new: true }
    ).select("-password"); // Exclude password from the result

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating avatar:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const getAvatarById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user || !user.avatar || !user.avatar.data) {
      return res.status(204).send(); // No content, but successful response
    }
    res.set("Content-Type", user.avatar.contentType);
    res.send(user.avatar.data);
  } catch (error) {
    res.status(500).send("An error occurred while retrieving the avatar");
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

export const getLikedMoviesIds = async (req, res) => {
  const { user_id } = req.params;
  try {
    const user = await User.findById(user_id).populate("likedMovies");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const likedMoviesIds = user.likedMovies.sort((a, b) => b.date - a.date);

    res.status(200).json({ likedMoviesIds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while getting likes" });
  }
};
