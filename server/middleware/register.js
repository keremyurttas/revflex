export const registerMiddleware = (req, res, next) => {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  const { username, password, prefferedName, genres } = req.body;
  if (!username || !password) {
    res.status(404).json({
      message: "Username or password is missing",
    });
  } else if (!passwordRegex.test(password)) {
    res.status(404).json({
      message:
        "Password Must contain 6+ characters, including at least 1 letter and 1 number",
    });
  } else if (username.length < 6) {
    res.status(404).json({
      message: "Username less than 6 characters",
    });
  } else if (!prefferedName || !genres) {
    res.status(404).json({
      message: "Some informations are missing",
    });
  } else {
    next();
  }
  
};
