"use client";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import Grid from "@mui/material/Grid";
import MovieCard from "./components/MovieCard";
import { useKeenSlider } from "keen-slider/react";
import CommentedCard from "./components/CommentedCard";
import "keen-slider/keen-slider.min.css";
import { useGlobalContext } from "./Context/store";
import { useEffect, useState } from "react";

const Page = () => {
  const {
    fetchPopularMovies,
    popularMovies,
    recentComments,
    fetchRecentComments,
  } = useGlobalContext();
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const [moviesSlider, instanceRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2.1,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 1280px)": {
        slides: {
          perView: 5.2,
          spacing: 15,
        },
      },
    },
  });
  const [commentsSlider, instanceCommentsRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.1,
      spacing: 15,
    },
    breakpoints: {
      "(min-width: 1280px)": {
        slides: {
          perView: 2.4,
          spacing: 20,
        },
      },
    },
  });

  useEffect(() => {
    const fetchMovies = async () => {
      await fetchPopularMovies();
      await fetchRecentComments();
      setMoviesLoaded(true);
    };
    fetchMovies();
  }, [fetchPopularMovies, fetchRecentComments]);

  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [moviesLoaded, popularMovies, instanceRef]);

  useEffect(() => {
    if (instanceCommentsRef.current) {
      instanceCommentsRef.current.update();
    }
  }, [recentComments, instanceCommentsRef]);
  return (
    <>
      <ThemeProvider theme={theme}>
        <Container
          component={"section"}
          maxWidth={"xl"}
          disableGutters
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
          <Box sx={{ marginBottom: "1rem" }}>
            <Typography
              variant="h6"
              fontSize={"1rem"}
              color={theme.palette.text.primary}
              sx={{ textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Popular Movies
            </Typography>
            <Grid ref={moviesSlider} className="keen-slider">
              {popularMovies &&
                popularMovies.map((movie) => (
                  <div key={movie.id} className="keen-slider__slide  ">
                    <MovieCard {...movie} />
                  </div>
                ))}
            </Grid>
          </Box>
          <Box>
            <Typography
              variant="h6"
              fontSize={"1rem"}
              color={theme.palette.text.primary}
              sx={{ textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Recent Comments
            </Typography>
            <Grid ref={commentsSlider} className="keen-slider">
              {recentComments.map((comment, index) => (
                <div key={index} className="keen-slider__slide  ">
                  <CommentedCard comment={comment} />
                </div>
              ))}
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Page;
