"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import { Container, Grid, Typography } from "@mui/material";
import MovieCard from "../components/MovieCard";
import { Movie } from "@/interfaces";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";

const Liked = () => {
  const { user, getLikedMovies } = useGlobalContext();
  const [likedMovies, setLikedMovies] = useState<Movie[]>();

  useEffect(() => {
    // Ensure user data is available before fetching liked movies
    if (user.id) {
      getLikedMovies()
        .then((movies) => {
          setLikedMovies(movies);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [user]);
  const handleDislike = (id: number) => {
    setLikedMovies(
      likedMovies && likedMovies.filter((movie) => movie.id !== id)
    );
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component={"section"}
          disableGutters
          maxWidth={"xl"}
          sx={{
            margin: 0,
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
            fontSize={"1rem"}
            color={theme.palette.text.primary}
            sx={{ textTransform: "uppercase", marginBottom: "1rem" }}
          >
            Liked Movies
          </Typography>
          {likedMovies && likedMovies?.length > 0 ? (
            <Grid container spacing={2}>
              {likedMovies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={movie.id}>
                  <MovieCard likeStatusChanged={handleDislike} {...movie} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography sx={{ fontSize: "2rem" }}>
              You haven't liked any movies yet.
            </Typography>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Liked;
