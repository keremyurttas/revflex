export const registerMiddleware = (req, res, next) => {
  const { username, password, prefferedName, genres } = req.body;
  if (!username || !password) {
    res.status(404).json({
      message: "Username or password is missing",
    });
  } else if (password.length < 6) {
    res.status(404).json({
      message: "Password less than 6 characters",
    });
  } else if (!prefferedName || !genres) {
    res.status(404).json({
      message: "Some informations are missing",
    });
  } else {
    next();
  }
};
