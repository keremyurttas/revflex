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
import { ChangeEvent, FC, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import { Theme } from "@mui/material/styles";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}
const SignupModal: FC<SignupModalProps> = ({ open, onClose }) => {
  const [stepIndex, setStepIndex] = useState(0);
  const [favGenres, setFavGenres] = useState<string[]>([]);
  const genres = ["action", "horror", "sci-fi"];
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const validation = () => true;
  const handleButton = () => {
    validation() ? setStepIndex(stepIndex + 1) : null;
  };
  const handleFavGenresChange = (
    event: SelectChangeEvent<typeof favGenres>
  ) => {
    const {
      target: { value },
    } = event;
    setFavGenres(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const ImageInput = () => {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        setSelectedImage(URL.createObjectURL(event.target.files[0]));
      }
    };
    const defaultAvatar =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVnsLhjbXRN_F--iLPPJ-ED7WP3qqfwhiAkNtgKsONg&s";

    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Box
          component="img"
          src={selectedImage || defaultAvatar}
          alt="Selected"
          sx={{
            width: 100,
            height: 100,
            marginBottom: 2,
            borderRadius: "10px",
          }}
        />

        <label htmlFor="image-input">
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="image-input"
            type="file"
            onChange={handleImageChange}
          />
          <Button variant="contained" component="span" sx={{}}>
            Upload Your Avatar
          </Button>
        </label>
        <Typography variant="body2" color="textSecondary">
          {selectedImage ? "Change Image" : "Select an image to upload"}
        </Typography>
      </Box>
    );
  };
  const FirstStepTemplate = () => {
    return (
      <Box
        sx={{
          display: "grid",
          rowGap: "2rem",
        }}
      >
        <Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              border: ".2px solid",
              borderRadius: "10px",
              paddingX: "1rem",
              gap: "1rem",
              marginBottom: "2rem",
              paddingY: "1rem",
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
          <Typography
            variant="body2"
            fontSize={".8rem"}
            color="primary"
            sx={{
              wordBreak: "break-word", // Ensures words break to fit the container
              whiteSpace: "normal", // Allows normal wrapping behavior
              width: "fit-content", // Ensures the text container takes full width
            }}
          >
            Must contain 8+ characters, including at least 1 letter and 1
            number.
          </Typography>
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
            onClick={handleButton}
          >
            Sign up
          </Button>
          <Typography
            color={theme.palette.primary.main}
            sx={{ marginX: "auto" }}
          >
            Already have an account?
            <Link
              sx={{ cursor: "pointer" }}
              color={theme.palette.secondary.main}
            >
              {" "}
              Log in
            </Link>
          </Typography>
        </Box>
      </Box>
    );
  };
  const SecondStepTemplate = () => {
    return (
      <Box>
        <ImageInput></ImageInput>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: ".2px solid",
            borderRadius: "10px",
            paddingX: ".8rem",
            gap: "1rem",
            marginBottom: "2rem",
            paddingY: ".8rem",
            transition: "border-radius 0.3s ease",
            "&:focus-within": {
              borderRadius: "20px",
            },
          }}
        >
          <DriveFileRenameOutlineIcon color="primary" />

          <InputBase
            placeholder="How should we call you?"
            sx={{ color: "white" }}
          ></InputBase>
        </Box>
        <FormControl
          sx={{ width: "100%", marginBottom: "2rem" }}
          variant="outlined"
        >
          <InputLabel
            sx={{ color: theme.palette.text.primary }}
            id="demo-multiple-chip-label"
          >
            Select favorite genres
          </InputLabel>
          <Select
            sx={{
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
                borderWidth: ".5px",
                borderRadius: "10px",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: theme.palette.secondary.main,
              },
            }}
            labelId="demo-multiple-chip-label"
            id="demo-multiple-chip"
            multiple
            value={favGenres}
            onChange={handleFavGenresChange}
            input={
              <OutlinedInput
                id="select-multiple-chip"
                label="Favorite genres"
              />
            }
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
            MenuProps={MenuProps}
          >
            {genres.map((genre) => (
              <MenuItem
                sx={{
                  backgroundColor: favGenres.includes(genre)
                    ? theme.palette.action.selected
                    : "inherit",
                  "&.Mui-selected": {
                    backgroundColor: theme.palette.action.selected,
                    color: theme.palette.secondary.main,
                    "&:hover": {
                      backgroundColor: theme.palette.action.selected,
                    },
                  },
                }}
                key={genre}
                value={genre}
              >
                {genre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
          Next
        </Button>
      </Box>
    );
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
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              bgcolor: "#080808",
              boxShadow: 24,
              maxWidth: "600px",
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
            {stepIndex === 0 ? FirstStepTemplate() : SecondStepTemplate()}
          </Box>
        </Fade>
      </Modal>
    </ThemeProvider>
  );
};

export default SignupModal;
