import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import theme from "@/theme/theme";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import LockIcon from "@mui/icons-material/Lock";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import { FC, useEffect, useRef, useState } from "react";
import { useGlobalContext } from "@/app/Context/store";
import { ErrorTypo } from "./ErrorTypo";
import Slider from "react-slick";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: FC<LoginModalProps> = ({ open, onClose }) => {
  const { setActiveModal, fetchUserDetails } = useGlobalContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    login: "",
  });

  const validate = () => {
    setFormErrors({
      username: "",
      password: "",
      login: "",
    });
    let valid = true;

    if (!username) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username is required",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    }

    if (!password) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password: "",
      }));
    }

    return valid;
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    const response = await fetch(`${process.env.BACKEND_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
      credentials: "include",
    });

    if (response.ok) {
      const data = await response.json();
      setActiveModal(null);
      fetchUserDetails();
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        login: "",
      }));
    } else {
      const errorMessage = await response.json(); // Get error message from the response
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        login: `Login failed: ${errorMessage.message}`,
      }));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        sx={{ color: theme.palette.secondary.main }}
        open={open}
        onClose={onClose}
        aria-labelledby="Login modal"
        aria-describedby="Login modal description"
      >
        <Fade timeout={1000} in={open}>
          <form onSubmit={handleLogin}>
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "#080808",
                boxShadow: 24,
                paddingX: "7rem",
                paddingY: "5rem",
                display: "grid",
                rowGap: "3rem",
                height: "70vh",
                width: "35vw",
                [theme.breakpoints.down("lg")]: {
                  paddingX: "2rem",
                  paddingY: "1.5rem",
                  width: "80%",
                  rowGap: "2rem",
                },
              }}
            >
              <Typography
                color="secondary"
                variant="h4"
                sx={{ fontWeight: "bold", margin: "auto" }}
              >
                Revflix
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ErrorTypo message={formErrors.login} />
              </Box>
              <Box>
                <Box sx={{ marginBottom: "2rem" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      border: ".2px solid",
                      borderRadius: "10px",
                      paddingX: "1rem",
                      gap: "1rem",
                      marginBottom: ".5rem",
                      paddingY: "1rem",

                      transition: "border-radius 0.3s ease",
                      "&:focus-within": {
                        borderRadius: "20px",
                      },
                    }}
                  >
                    <PersonIcon color="primary" />
                    <InputBase
                      autoFocus
                      placeholder="Username"
                      sx={{ color: "white" }}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </Box>
                  <ErrorTypo message={formErrors.username} />
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    border: ".2px solid",
                    borderRadius: "10px",
                    paddingX: "1rem",
                    gap: "1rem",
                    paddingY: "1rem",
                    transition: "border-radius 0.3s ease",
                    "&:focus-within": {
                      borderRadius: "20px",
                    },
                    marginBottom: ".5rem",
                  }}
                >
                  <LockIcon color="primary" />
                  <InputBase
                    type="password"
                    placeholder="Password"
                    sx={{ color: "white" }}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Box>
                <ErrorTypo message={formErrors.password} />
                <Link
                  sx={{
                    float: "right",
                  }}
                >
                  Forgot Password?
                </Link>
              </Box>

              <Box sx={{ display: "grid", rowGap: "1rem" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{
                    color: theme.palette.secondary.main,
                    borderRadius: "10px",
                    paddingY: "1rem",
                    transition: "border-radius 0.3s ease",
                    "&:hover": {
                      borderRadius: "15px",
                    },
                    [theme.breakpoints.down("lg")]: {
                      paddingY: "1rem",
                    },
                  }}
                  fullWidth
                >
                  Log In
                </Button>

                <Typography
                  color={theme.palette.primary.main}
                  sx={{ marginX: "auto" }}
                >
                  Don’t have an account?
                  <Link
                    sx={{
                      cursor: "pointer",
                    }}
                    color={theme.palette.secondary.main}
                    onClick={() => {
                      setActiveModal("signup");
                    }}
                  >
                    Sign up
                  </Link>
                </Typography>
              </Box>
            </Box>
          </form>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default LoginModal;
