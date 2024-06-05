"use client";
import { Box, Container } from "@mui/material";
import Typography from "@mui/material/Typography";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import MovieCard from "./components/MovieCard";
import CommentedCard from "./components/CommentedCard";
import { useGlobalContext } from "./Context/store";
import { useEffect, useState } from "react";
import { Movie } from "@/interfaces";
import Slider from "react-slick";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
const Page = () => {
  const {
    fetchPopularMovies,
    popularMovies,
    recentComments,
    fetchRecentComments,
    searchResults,
    searchMovieByKey
  } = useGlobalContext();
  const [moviesLoaded, setMoviesLoaded] = useState(false);
  const commentsSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    dots: true,
    arrows: false,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const moviesSliderContainer = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    dots: true,
    slidesToScroll: 4,
    arrows: false,

    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  // const [commentsSlider, instanceCommentsRef] = useKeenSlider({
  //   loop: true,
  //   slides: {
  //     perView: 1.1,
  //     spacing: 15,
  //   },
  //   breakpoints: {
  //     "(min-width: 1280px)": {
  //       slides: {
  //         perView: 2.4,
  //         spacing: 20,
  //       },
  //     },
  //   },
  // });

  useEffect(() => {
    const fetchMovies = async () => {
      await fetchPopularMovies();
      await fetchRecentComments();
      setMoviesLoaded(true);
    };
    fetchMovies();
  }, [fetchPopularMovies, fetchRecentComments]);

  // useEffect(() => {
  //   if (instanceRef.current) {
  //     instanceRef.current.update();
  //   }
  // }, [popularMovies, moviesLoaded, instanceRef]);

  // useEffect(() => {
  //   if (instanceCommentsRef.current) {
  //     instanceCommentsRef.current.update();
  //   }
  // }, [recentComments, instanceCommentsRef]);

  const renderMovies = (movies: Movie[]) => {
    return movies.map((movie) => (
      <div key={movie.id} className="">
        <MovieCard {...movie} />
      </div>
    ));
  };
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
            height: "100vh",
          }}
        >
          <Box
            sx={{
              display: "none",
              alignItems: "center",
              border: ".2px solid",
              borderRadius: "10px",
              paddingX: "1rem",
              gap: "1rem",
              paddingY: "1rem",
              marginBottom:"2rem",
              borderColor:theme.palette.text.primary,
              [theme.breakpoints.down("lg")]:{
                display:"flex"
              }
            }}
          >
            
              <SearchIcon color="primary" />
         
           

            <InputBase
              onChange={searchMovieByKey}
             
              placeholder="Search"
              sx={{ color: "white" }}
            ></InputBase>
          </Box>
          <Box sx={{ marginBottom: "4rem", position: "relative" }}>
            <Typography
              variant="h6"
              fontSize={"1rem"}
              color={theme.palette.text.primary}
              sx={{ textTransform: "uppercase", marginBottom: "1rem" }}
            >
              {searchResults.length > 0 ? "Search Results" : "Popular Movies"}
            </Typography>

            <Slider {...moviesSliderContainer}>
              {searchResults.length > 0
                ? renderMovies(searchResults)
                : renderMovies(popularMovies)}
            </Slider>
          </Box>
          <Box sx={{ position: "relative", height: "40%" }}>
            <Typography
              variant="h6"
              fontSize={"1rem"}
              color={theme.palette.text.primary}
              sx={{ textTransform: "uppercase", marginBottom: "1rem" }}
            >
              Recent Comments
            </Typography>
            {/* <Grid ref={commentsSlider} className="keen-slider">
              {recentComments.map((comment, index) => (
                <div key={index} className="keen-slider__slide  ">
                  <CommentedCard comment={comment} />
                </div>
              ))}
            </Grid> */}
            <Slider {...commentsSliderSettings}>
              {recentComments.map((comment, index) => (
                <CommentedCard key={index} comment={comment} />
              ))}
            </Slider>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};

export default Page;
