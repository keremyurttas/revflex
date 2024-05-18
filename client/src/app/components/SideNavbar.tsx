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
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import InputBase from "@mui/material/InputBase";
import ListIcon from "@mui/icons-material/List";
import CloseIcon from "@mui/icons-material/Close";
import { usePathname } from "next/navigation";

const SideNavbar = () => {
  const path = usePathname()?.slice(1); // remove the '/'
  const [value, setValue] = useState(path || "home"); // Use the path or default to "home"
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [showNavbar, setShowNavbar] = useState(false);
  const [isSlideExitCompleted, setIsSlideExitCompleted] = useState(true);
  const signedUp = true;

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (isLargeScreen) {
      setShowNavbar(true); // Show navbar on large screens
    } else {
      setShowNavbar(false); // Hide navbar on small screens
    }
  }, [isLargeScreen]);

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
            },
            width: "25%",
            background: "#080808",
            paddingX: "4rem",
            paddingY: "2rem",
            display: "flex",
            gap: "2rem",
            flexDirection: "column",
            height: "100vh", // Full viewport height
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
            value={value}
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
                color: "#ffff",
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
          {/* <Divider
            sx={{
              opacity: ".7",
              backgroundColor: "#5C5C5C",
              height: ".1rem",
            }}
          /> */}
          {signedUp ? (
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
                <Avatar
                  alt="Username"
                  src="https://mui.com/static/images/avatar/1.jpg"
                />
                <Box>
                  <Typography variant="h6">Chan Geme</Typography>
                  <Typography variant="body2" sx={{ color: "#8E8E8E" }}>
                    @changeme
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
            >
              Sign Up
            </Button>
          )}
        </Box>
      </Slide>
    </ThemeProvider>
  );
};

export default SideNavbar;
