import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";
import upload from "../multerConfig.js";
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
      res
        .status(401)
        .json({ message: "User not found", });
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
export const getUserInformationsByToken = (req, res) => {
  const token = req.cookies.jwt;
  return new Promise((resolve, reject) => {
    if (!token) {
      reject("Token not provided");
    } else {
      jwt.verify(token, jwtSecret, (err, decodedToken) => {
        console.log(decodedToken);
        if (err) {
          reject("Invalid token");
        } else {
          // Resolve the promise with the username and role
          resolve({
            username: decodedToken.username,
            genres: decodedToken.genres,
            prefferedName: decodedToken.prefferedName,
          });
        }
      });
    }
  })
    .then((userInfo) => {
      // Send the response with the username and role
      res.json(userInfo);
    })
    .catch((error) => {
      // Handle the error
      res.status(401).json({ error: error });
    });
};
export const logoutController = (req, res) => {
  res.cookie("jwt", "", { maxAge: "1" });
  res.redirect("/");
};
