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

const Page = () => {
  const [moviesSlider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 2.1,
    },
    breakpoints: {
      "(min-width: 1280px)": {
        slides: {
          perView: 5.2,
        },
      },
    },
  });
  const [commentsSlider] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.1,
    },
    breakpoints: {
      "(min-width: 1280px)": {
        slides: {
          perView: 2.5,
        },
      },
    },
  });

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
              <div className="keen-slider__slide  ">
                <MovieCard />
              </div>
              <div className="keen-slider__slide ">
                <MovieCard />
              </div>
              <div className="keen-slider__slide ">
                <MovieCard />
              </div>
              <div className="keen-slider__slide ">
                <MovieCard />
              </div>
              <div className="keen-slider__slide ">
                <MovieCard />
              </div>
              <div className="keen-slider__slide ">
                <MovieCard />
              </div>
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
              <div className="keen-slider__slide  ">
                <CommentedCard />
              </div>
              <div className="keen-slider__slide ">
                <CommentedCard />
              </div>
              <div className="keen-slider__slide ">
                <CommentedCard />
              </div>
              <div className="keen-slider__slide ">
                <CommentedCard />
              </div>
              <div className="keen-slider__slide ">
                <CommentedCard />
              </div>
              <div className="keen-slider__slide ">
                <CommentedCard />
              </div>
            </Grid>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Page;
