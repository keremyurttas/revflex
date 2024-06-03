"use client";
import { Button } from "@mui/material";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
const UpdateAvatar = () => {
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setAvatarFile(file);
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
      const response = await fetch(
        "http://localhost:8000/api/users/update-avatar",
        {
          method: "POST",
          body: formData,
          credentials: "include", // If you are using cookies for authentication
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Avatar updated successfully", data);
      } else {
        console.error("Failed to update avatar", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Update Avatar</button>
    </form>
  );
};
const User = () => {
  const { setUser } = useGlobalContext();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/logout", {
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
    <>
      <Button onClick={handleLogout}>LOGOUT</Button>
      <UpdateAvatar />
    </>
  );
};

export default User;
