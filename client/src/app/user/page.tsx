"use client";
import { Button } from "@mui/material";
import { useGlobalContext } from "../Context/store";
import { useRouter } from "next/navigation";

const User = () => {
  const { setUser } = useGlobalContext();
  const router = useRouter()
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
        });
        console.log("Logged out successfully");
        router.push('/')
      } else {
        console.error("Failed to log out:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while logging out:", error);
    }
  };
  return <Button onClick={handleLogout}>LOGOUT</Button>;
};

export default User;
