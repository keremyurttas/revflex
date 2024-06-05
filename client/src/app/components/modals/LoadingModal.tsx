import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import { Box, CircularProgress, Fade } from "@mui/material";
import Modal from "@mui/material/Modal";
import { FC } from "react";

interface LoadingModalProps {
  open: boolean;
}

const LoadingModal: FC<LoadingModalProps> = ({ open }) => {
  return (
    <ThemeProvider theme={theme}>
      <Modal
        sx={{ color: theme.palette.secondary.main }}
        open={open}
        aria-labelledby="Loading modal"
      >
        <Fade timeout={1000} in={open}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              outline: "none",

              [theme.breakpoints.down("lg")]: {
                paddingX: "2rem",
                paddingY: "1.5rem",
                width: "80%",
                rowGap: "2rem",
              },
            }}
          >
            <CircularProgress size={80} color={"secondary"} />
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};
export default LoadingModal;
