"use client";
import {
  Avatar,
  Box,
  Container,
  Divider,
  Rating,
  Typography,
} from "@mui/material";
import { useParams } from "next/navigation";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import LanguageIcon from "@mui/icons-material/Language";
import { useKeenSlider } from "keen-slider/react";
import { AddComment } from "@/app/components/AddComment";
import { MovieData, Comment } from "@/interfaces";
import { useEffect, useState } from "react";
import { MovieComment } from "@/app/components/MovieComment";
import { useGlobalContext } from "@/app/Context/store";
const Movie = () => {
  const [movieData, setMovieData] = useState<MovieData | null>(null);
  const { movieId } = useParams();
  const [comments, setComments] = useState<Comment[]>([]);
  const { user } = useGlobalContext();

  const fetchCommentsByMovieId = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/movies/${movieId}/comments`
      );
      if (response.ok) {
        const movieComments = await response.json();
        const commentsArray = Array.isArray(movieComments)
          ? movieComments
          : Object.values(movieComments);

        setComments(commentsArray);
      } else {
        console.error("Failed to fetch comments:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };
  const fetchMovieData = async () => {
    const movieDetailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=0c1c779b65d0bbadb26f4d37ed5eda05&language=en-US`;
    const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=0c1c779b65d0bbadb26f4d37ed5eda05&language=en-US`;

    try {
      const [detailsResponse, creditsResponse] = await Promise.all([
        fetch(movieDetailsUrl),
        fetch(movieCreditsUrl),
      ]);

      if (!detailsResponse.ok) {
        throw new Error(
          `Failed to fetch movie details: ${detailsResponse.statusText}`
        );
      }

      if (!creditsResponse.ok) {
        throw new Error(
          `Failed to fetch movie credits: ${creditsResponse.statusText}`
        );
      }

      const movieDetails = await detailsResponse.json();
      const movieCredits = await creditsResponse.json();

      // Extract director
      const director = movieCredits.crew.find(
        (member: { job: string }) => member.job === "Director"
      );

      // Extract main cast (highlighted cast)
      const highlightedCast = movieCredits.cast.slice(0, 5);

      // Combine the results
      const combinedResult = {
        ...movieDetails,
        director: director
          ? { name: director.name, profile_path: director.profile_path }
          : { name: "Unknown", profile_path: null },
        cast: highlightedCast.map(
          (member: {
            name: String;
            character: String;
            profile_path: String;
          }) => ({
            name: member.name,
            character: member.character,
            profile_path: member.profile_path,
          })
        ),
      };

      setMovieData(combinedResult);
    } catch (error) {
      console.error("Error fetching movie details and credits:", error);
    }
  };
  useEffect(() => {
    fetchCommentsByMovieId();
    fetchMovieData();
  }, []);

  const [ref] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: {
      perView: 1.2,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 1280px)": {
        slides: {
          spacing: 10,
          perView: 5,
        },
      },
    },
  });
  const handleNewComment = (newComment: Comment) => {
    setComments([newComment, ...comments]);
  };
  const handleDeleteCommentLocal = (id: string) => {
    setComments(comments.filter((comment) => comment._id !== id));
  };

  if (!movieData || !comments) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <Box component={"section"} padding={"2rem"}>
          <Box
            gridTemplateColumns={"5fr 2fr"}
            sx={{
              display: "grid",
              [theme.breakpoints.down("lg")]: {
                display: "block",
              },
            }}
          >
            <Box position={"relative"} maxHeight={"500px"}>
              <Box
                component="img"
                src={`https://image.tmdb.org/t/p/original/${movieData.backdrop_path}`}
                sx={{
                  borderRadius: "1rem",
                  objectFit: "cover",
                  height: "100%",
                  width: "100%",
                }}
              />
              <Box
                position={"absolute"}
                gap={1}
                bottom={10}
                left={10}
                display={"flex"}
                padding={1}
                bgcolor={theme.palette.text.primary}
                borderRadius={2}
              >
                <LanguageIcon />
                <Typography variant="body1">
                  {movieData.original_language.toUpperCase()}
                </Typography>
                - {movieData.release_date.slice(0, 4)}
              </Box>
            </Box>

            <Box sx={{ padding: "1rem" }}>
              <Typography
                fontSize={45}
                variant="h2"
                marginBottom={"1rem"}
                color={"secondary"}
              >
                {movieData.title}
              </Typography>
              <Box>
                <Typography
                  sx={{
                    color: theme.palette.text.primary,
                    marginBottom: "1rem",
                  }}
                  fontSize={30}
                  variant="h4"
                >
                  Summary
                </Typography>
                <Typography
                  sx={{ letterSpacing: ".2rem" }}
                  fontSize={20}
                  variant="body2"
                >
                  {movieData.overview}
                </Typography>
                <Box display={"flex"} gap={"1rem"} marginTop={2}>
                  {movieData.genres.map((genre, index) => (
                    <Box
                      key={index}
                      sx={{
                        [theme.breakpoints.down("lg")]: {
                          padding: ".2rem .1rem ",
                        },
                        padding: ".5rem 1rem ",
                        bgcolor: theme.palette.text.primary,
                        width: "max-content",
                        borderRadius: "1rem",
                      }}
                    >
                      {genre.name}
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box>
            <Typography
              sx={{
                marginY: "1rem",
              }}
              fontSize={30}
              variant="h4"
            >
              Highlights
            </Typography>
            <Divider
              sx={{
                background: theme.palette.text.primary,
                marginBottom: "1rem",
              }}
            />
            <Box
              sx={{
                display: "flex",
                position: "relative",
                overflowX: "hidden",
                overflowY: "visible",
              }}
              ref={ref}
              className="keen-slider"
            >
              <Box
                maxWidth={"120px"}
                maxHeight={"300px"}
                className={"keen-slider__slide"}
              >
                <Avatar
                  sx={{
                    width: "100%",
                    height: "80%",
                    borderRadius: ".5rem",
                    objectFit: "cover",
                  }}
                  variant="square"
                  src={`https://image.tmdb.org/t/p/w500/${movieData.director.profile_path}`}
                />
                <Typography>{movieData.director.name}</Typography>
                <Typography fontWeight={"bold"}>Director</Typography>
              </Box>

              {movieData.cast.map((cast, index) => (
                <Box
                  key={index}
                  maxWidth={"120px"}
                  maxHeight={"300px"}
                  className={"keen-slider__slide"}
                >
                  <Avatar
                    sx={{
                      width: "100%",
                      height: "80%",
                      borderRadius: ".5rem",
                    }}
                    variant="square"
                    src={`https://image.tmdb.org/t/p/w500/${cast.profile_path}`}
                  />
                  <Typography>{cast.name}</Typography>
                  <Typography fontWeight={"bold"}>{cast.character}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            marginY: "2rem",
          }}
        >
          {user.id ? (
            <AddComment onNewComment={handleNewComment} />
          ) : (
            <Typography>You must login to add a comment</Typography>
          )}

          {comments.length > 0 ? (
            comments.map((comment: Comment, index) => (
              <MovieComment
                key={index}
                comment={comment}
                deleteCommentLocal={handleDeleteCommentLocal}
              />
            ))
          ) : (
            <Typography>No comments available.</Typography>
          )}
        </Container>
      </ThemeProvider>
    </>
  );
};
export default Movie;
