"use client";
import { Box, Button, Container, Typography } from "@mui/material";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme/theme";
import EditIcon from "@mui/icons-material/Edit";
// const UpdateAvatar = () => {
//   // const [avatarFile, setAvatarFile] = useState<File | null>(null);

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0] || null;
//     setAvatarFile(file);
//   };

//   const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (!avatarFile) {
//       alert("Please select an avatar image.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("avatar", avatarFile);

//     try {
//       const response = await fetch(
//         "http://localhost:8000/api/users/update-avatar",
//         {
//           method: "POST",
//           body: formData,
//           credentials: "include", // If you are using cookies for authentication
//         }
//       );

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Avatar updated successfully", data);
//       } else {
//         console.error("Failed to update avatar", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input type="file" accept="image/*" onChange={handleFileChange} />
//       <button type="submit">Update Avatar</button>
//     </form>
//   );
// };
const User = () => {
  const { setUser } = useGlobalContext();
  const router = useRouter();
  const { user } = useGlobalContext();
  const BACKEND_URL = process.env.BACKEND_URL;
  const defaultAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZVnsLhjbXRN_F--iLPPJ-ED7WP3qqfwhiAkNtgKsONg&s";
  const [avatar, setAvatar] = useState<string | ArrayBuffer | null>(
    defaultAvatar
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  useEffect(() => {
    if (user.id) {
      setAvatar(`${BACKEND_URL}/avatars/${user.id}`);
    }
  }, [user]);

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
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (!avatarFile) {
        alert("Please select an avatar image.");
        return;
      }

      const formData = new FormData();
      formData.append("avatar", avatarFile);

      try {
        const response = await fetch(`${BACKEND_URL}/users/update-avatar`, {
          method: "POST",
          body: formData,
          credentials: "include", // If you are using cookies for authentication
        });

        if (response.ok) {
          const data = await response.json();

          window.location.reload();
        } else {
          console.error("Failed to update avatar", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "relative",
        }}
      >
        <Box
          component="img"
          src={getAvatarSrc()}
          alt="Selected"
          sx={{
            width: 300,
            height: 300,
            marginBottom: 2,
            borderRadius: "10px",
            borderColor: "white",
            borderWidth: 1,
          }}
        />

        <form onSubmit={handleSubmit}>
          <input
            style={{ display: "none" }}
            accept="image/*"
            id="image-input"
            type="file"
            onChange={handleImageChange}
          />
          <label htmlFor="image-input">
            <Box
              sx={{
                position: "absolute",
                right: -10, // Move it slightly to the right
                top: -10, // Move it slightly up
                padding: "1rem",
                background: theme.palette.text.primary,
                borderRadius: 10,
              }}
            >
              <EditIcon sx={{ fontSize: "1.5rem" }} />
            </Box>
          </label>
          {avatarFile && (
            <Button variant="contained" type="submit">
              Submit
            </Button>
          )}
        </form>
        <Typography variant="body2" color="textSecondary">
          {avatar ? "Change Image" : "Select an image to upload"}
        </Typography>
      </Box>
    );
  };
  const handleLogout = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/logout`, {
        method: "GET", // Assuming logout should be a POST request
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      console.log(response);
      if (response.ok) {
        // Clear the user state
        setUser({
          username: "",
          prefferedName: "",
          genres: [],
          likes: [],
          avatar: "",
          id: "",
        });
        console.log("Logged out successfully");
        router.push("/");
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <Container
        component={"section"}
        disableGutters
        maxWidth={"xl"}
        sx={{
          margin: "0",
          marginY: "2rem",
          paddingX: "8rem",
          [theme.breakpoints.down("lg")]: {
            paddingX: "1rem",
            marginY: 0,
          },
        }}
      >
        <Typography
          variant="h6"
          fontSize={"1.5rem"}
          color={theme.palette.text.primary}
          sx={{ marginBottom: "1rem" }}
        >
          Welcome {user.prefferedName}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            gap: "4rem",
          }}
        >
          <ImageInput />
          <Button onClick={handleLogout} variant="outlined" color={"secondary"}>
            Logout
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default User;
