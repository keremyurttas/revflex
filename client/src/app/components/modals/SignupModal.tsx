"use client";
import { ThemeProvider } from "@emotion/react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import theme from "@/theme/theme";
import PersonIcon from "@mui/icons-material/Person";
import InputBase from "@mui/material/InputBase";
import LockIcon from "@mui/icons-material/Lock";
import Link from "@mui/material/Link";
import Fade from "@mui/material/Fade";
import { ChangeEvent, FC, useState } from "react";
import FormControl from "@mui/material/FormControl";
// import InputLabel from "@mui/material/InputLabel
import Select, { SelectChangeEvent } from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import { useGlobalContext } from "@/app/Context/store";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@mui/material/InputLabel";
import { ErrorTypo } from "./ErrorTypo";

interface SignupModalProps {
  open: boolean;
  onClose: () => void;
}

const SignupModal: FC<SignupModalProps> = ({ open, onClose }) => {
  const { setActiveModal, fetchUserDetails } = useGlobalContext();
  const [stepIndex, setStepIndex] = useState(0);
  const [favGenres, setFavGenres] = useState<string[]>([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [prefferedName, setPrefferedName] = useState("");
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
    avatar: "",
    prefferedName: "",
    genres: "",
    register: "",
  });

  const firstValidate = () => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let valid = true;

    if (username.length < 6) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: "Username less than 6 characters",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        username: "",
      }));
    }

    if (!passwordRegex.test(password)) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        password:
          "Must contain 6+ characters, including at least 1 letter and 1 number.",
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
  const secondValidate = () => {
    let valid = true;

    if (!prefferedName) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        prefferedName: "Write your preffered name",
      }));
      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        prefferedName: "",
      }));
    }

    if (favGenres.length < 1) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        genres: "Select at least 1 genre",
      }));

      valid = false;
    } else {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        genres: "",
      }));
    }

    return valid;
  };

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

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (secondValidate() && firstValidate()) {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("password", password);
      formData.append("prefferedName", prefferedName);
      formData.append("genres", JSON.stringify(favGenres)); // Assuming genres is an array
      if (avatarFile) {
        formData.append("avatar", avatarFile);
      }
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
          {
            method: "POST",
            body: formData,
            credentials: "include",
          }
        );

        if (response.ok) {
          const data = await response.json();
          document.cookie = `user_id=${data.user._id}`;

          setActiveModal(null);
          fetchUserDetails();
        } else {
          const errorMessage = await response.json(); // Get error message from the response
          setFormErrors((prevErrors) => ({
            ...prevErrors,
            register: `Register failed: ${errorMessage.message}`,
          }));
        }
      } catch (error) {
        console.error(
          "An error occurred while handling the register request:",
          error
        );
      }
    }
  };

  const handleButton = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (firstValidate()) {
      setStepIndex(stepIndex + 1);
    }
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
    const getAvatarSrc = (): string | undefined => {
      if (avatar === null) {
        return defaultAvatar;
      }
      if (typeof avatar === "string") {
        return avatar;
      }
      if (avatar instanceof ArrayBuffer) {
        return Buffer.from(avatar).toString("base64");
      }
      return undefined;
    };
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files && event.target.files[0]) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const reader = new FileReader();
        reader.onloadend = () => {
          setAvatar(reader.result);
        };
        reader.readAsDataURL(file);
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
          src={getAvatarSrc()}
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
          <Button variant="contained" component="span">
            Upload Your Avatar
          </Button>
        </label>
        <Typography variant="body2" color="textSecondary">
          {avatar ? "Change Image" : "Select an image to upload"}
        </Typography>
      </Box>
    );
  };

  const FirstStepTemplate = () => {
    return (
      <form onSubmit={handleButton}>
        <Box
          sx={{
            display: "grid",
            rowGap: "2rem",
          }}
        >
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
                  placeholder="Username"
                  sx={{ color: "white" }}
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                ></InputBase>
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
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></InputBase>
            </Box>

            <Typography
              variant="body2"
              fontSize={".8rem"}
              color={formErrors.password ? "error" : "primary"}
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
              type="submit"
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
                onClick={() => {
                  setActiveModal("login");
                }}
              >
                {" "}
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </form>
    );
  };

  const SecondStepTemplate = () => {
    return (
      <Box>
        <form onSubmit={handleRegister}>
          <Button
            onClick={() => {
              setStepIndex(stepIndex - 1);
            }}
            sx={{ position: "absolute", top: "2rem", left: "2rem" }}
          >
            <ArrowBackIcon fontSize="large" />
          </Button>
          <ImageInput />
          <Box sx={{ marginBottom: "2rem" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                border: ".2px solid",
                borderRadius: "10px",
                paddingX: ".8rem",
                gap: "1rem",
                marginBottom: ".5rem",
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
                value={prefferedName} // Set value to maintain state
                onChange={(e) => {
                  setPrefferedName(e.target.value);
                }}
              ></InputBase>
            </Box>
            <ErrorTypo message={formErrors.prefferedName} />
          </Box>
          <Box sx={{ marginBottom: "2rem" }}>
            <FormControl
              sx={{ width: "100%", marginBottom: ".5rem" }}
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
            <ErrorTypo message={formErrors.genres} />
            {formErrors.register && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <ErrorTypo message={formErrors.register} />
                <Link
                  sx={{ cursor: "pointer" }}
                  fontSize={"small"}
                  onClick={() => {
                    setStepIndex(stepIndex - 1);
                  }}
                >
                  Go to previous step
                </Link>
              </Box>
            )}
          </Box>

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
            Next
          </Button>
        </form>
      </Box>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <Modal
        sx={{ color: theme.palette.secondary.main }}
        open={open}
        onClose={onClose}
        aria-labelledby="Signup modal"
        aria-describedby="Signup modal description"
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
              rowGap: "1rem",
              width: "35vw",
              [theme.breakpoints.down("lg")]: {
                paddingX: "2rem",
                paddingY: "1.5rem",
                width: "80%",
                rowGap: "2rem",
                height: "min-content",
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
