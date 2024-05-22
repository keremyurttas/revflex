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
import { FC } from "react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}
const LoginModal: FC<LoginModalProps> = ({ open, onClose }) => {
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
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  border: ".2px solid",
                  borderRadius: "10px",
                  paddingX: "1rem",
                  gap: "1rem",
                  paddingY: "1rem",
                  marginBottom: "2rem",
                  transition: "border-radius 0.3s ease",
                  "&:focus-within": {
                    borderRadius: "20px",
                  },
                }}
              >
                <PersonIcon color="primary" />

                <InputBase
                  placeholder="Username"
                  sx={{ color: "white" }}
                ></InputBase>
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
                ></InputBase>
              </Box>
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
                <Link color={theme.palette.secondary.main}> Sign up</Link>
              </Typography>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default LoginModal;
