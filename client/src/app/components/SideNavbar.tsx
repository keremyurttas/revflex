"use client";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Button, Link, Slide, Typography, useMediaQuery } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import theme from "../../theme/theme";
import { ThemeProvider } from "@emotion/react";
import HomeIcon from "@mui/icons-material/Home";
import ThumbsUpDownIcon from "@mui/icons-material/ThumbsUpDown";
import FavoriteIcon from "@mui/icons-material/Favorite";
import React, { useEffect, useState } from "react";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InputBase from "@mui/material/InputBase";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";
import { useGlobalContext } from "../Context/store";
import { CircleAvatar } from "./CircleAvatar";

const SideNavbar = () => {
  const path = usePathname()?.slice(1); // remove the '/'
  // const validatedPath =path ? allowedPaths.includes(path) : path : null;
  const [currentTab, setCurrentTab] = useState(path || "home");
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [showNavbar, setShowNavbar] = useState(false);
  const [isSlideExitCompleted, setIsSlideExitCompleted] = useState(true);
  const { setActiveModal, user, fetchUserDetails, searchMovieByKey } =
    useGlobalContext();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  };
  useEffect(() => {
    fetchUserDetails(); // Fetch user details when component mounts
  }, [fetchUserDetails]);
  useEffect(() => {
    if (isLargeScreen) {
      setShowNavbar(true); // Show navbar on large screens
    } else {
      setShowNavbar(false); // Hide navbar on small screens
    }
  }, [isLargeScreen]);
  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Clean up the effect when the component is unmounted
    return () => {
      document.body.style.overflow = "";
    };
  }, [showNavbar]);

  return (
    <ThemeProvider theme={theme}>
      {!isLargeScreen && !showNavbar && isSlideExitCompleted && (
        <Button
          sx={{
            padding: "2rem",
          }}
          onClick={() => {
            setShowNavbar(true);
            setIsSlideExitCompleted(false);
          }}
        >
          <ListIcon sx={{ width: "40px", height: "40px" }} color="secondary" />
        </Button>
      )}

      <Slide
        direction="right"
        in={showNavbar}
        mountOnEnter
        unmountOnExit
        onExited={() => {
          setIsSlideExitCompleted(true);
        }}
      >
        <Box
          sx={{
            [theme.breakpoints.down("lg")]: {
              width: "100%",
              height: "100vh",
            },
            minHeight: "100vh",
            background: "#080808",
            paddingX: "4rem",
            paddingY: "2rem",
            display: "flex",
            gap: "2rem",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Link href="/" underline="none">
              <Typography
                color="secondary"
                variant="h4"
                sx={{ fontWeight: "bold" }}
              >
                Revflix
              </Typography>
            </Link>
            {!isLargeScreen && (
              <Button>
                <CloseIcon
                  onClick={() => {
                    setShowNavbar(false);
                  }}
                />
              </Button>
            )}
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
            }}
          >
            <SearchIcon color="primary" />

            <InputBase
              onChange={searchMovieByKey}
              inputProps={{
                "aria-label": "search google maps", // Change label color here
              }}
              placeholder="Search"
              sx={{ color: "white" }}
            ></InputBase>
          </Box>

          <Tabs
            orientation="vertical"
            variant="fullWidth"
            value={currentTab}
            onChange={handleChange}
            TabIndicatorProps={{
              sx: {
                backgroundColor: "red",
                color: "white", // Custom indicator color
              },
            }}
            sx={{
              "& .Mui-selected": {
                backgroundColor: "#1F1F1F",
                color: theme.palette.primary.main,
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px", // Custom background color for the active tab
              },
            }}
          >
            <Tab
              value="home"
              sx={{
                color: "white",
                justifyContent: "start",
                gap: "1rem",
                marginBottom: ".5rem",
              }}
              icon={<HomeIcon />}
              iconPosition="start"
              label="Home"
              href="/"
            />
            <Tab
              value="liked"
              sx={{
                color: "white",
                justifyContent: "start",
                gap: "1rem",
                marginBottom: ".5rem",
              }}
              icon={<FavoriteIcon />}
              iconPosition="start"
              label="Liked"
              href="/liked"
            />
            <Tab
              value="rated"
              sx={{ color: "white", justifyContent: "start", gap: "1rem" }}
              icon={<ThumbsUpDownIcon />}
              iconPosition="start"
              label="Rated / Commented"
              href="rated"
            />
          </Tabs>

          {user.username ? (
            <Button
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                marginTop: "auto",
                marginBottom: "2rem",
                textTransform: "none",
                textAlign: "left",
              }}
              href="/user"
            >
              <Box sx={{ display: "flex", gap: "2rem", alignItems: "center" }}>
                <CircleAvatar id={user.id} owner={user.username} />

                <Box>
                  <Typography variant="h6">{user.prefferedName}</Typography>
                  <Typography
                    variant="body2"
                    color={theme.palette.text.primary}
                  >
                    @{user.username}
                  </Typography>
                </Box>
              </Box>
              <MoreHorizIcon />
            </Button>
          ) : (
            <Button
              color="secondary"
              sx={{
                position: "relative",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer", // Change cursor to indicate clickable element
                marginTop: "auto", // Push the box to the bottom
                marginBottom: "2rem",
              }}
              onClick={() => {
                setActiveModal("login");
              }}
            >
              LOGIN
            </Button>
          )}
        </Box>
      </Slide>
    </ThemeProvider>
  );
};

export default SideNavbar;
