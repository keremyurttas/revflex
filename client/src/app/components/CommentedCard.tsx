"use client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
} from "@mui/material";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import Avatar from "@mui/material/Avatar";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { Comment, MovieDetails } from "@/interfaces";
import { useEffect, useState } from "react";
import { handleNoImage } from "../utils/imageUtils";
import { formatDistanceToNow } from "date-fns";
import { CircleAvatar } from "./CircleAvatar";

const CommentedCard: React.FC<{ comment: Comment }> = ({ comment }) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails>();
  useEffect(() => {
    const getMoviePath = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${comment.movie_id}?api_key=0c1c779b65d0bbadb26f4d37ed5eda05`,
        {
          method: "GET",
        }
      );
      if (response.ok) {
        const movieData = await response.json();
        const posterPath = movieData.poster_path;
        const title = movieData.title;

        setMovieDetails({ posterPath, title });
      }
    };
    if (comment.movie_id) {
      getMoviePath();
    }
  }, []);
  const formatRelativeTime = () => {
    const date = new Date(comment.date);
    return formatDistanceToNow(date, { addSuffix: true });
  };
  return (
    <ThemeProvider theme={theme}>
      <Card
        tabIndex={0}
        sx={{
          cursor: "pointer",
          marginRight: "1rem",
          position: "relative",
          height: "100%",
          bgcolor: "transparent",
          color: theme.palette.primary.main,
       
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
            boxShadow: theme.shadows[5],
            "& .hover-button": {
              color: "red",
            },
          },
          [theme.breakpoints.down("lg")]: {
            "&:hover": {
              transform: "none",
              transition:"none"
            }
          },
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{
            height: 250,
            borderRadius: "8px",
            [theme.breakpoints.down("lg")]: {
              height: 200,
            },
          }}
          image={handleNoImage(
            movieDetails?.posterPath,
            `https://image.tmdb.org/t/p/w500/${movieDetails?.posterPath}`
          )}
        />
        <CardContent sx={{ paddingX: 0 }}>
          <Typography
            fontSize={"1.2rem"}
            fontWeight={600}
            variant="h5"
            sx={{ marginBottom: ".5rem" }}
          >
            {movieDetails?.title}
          </Typography>
          <Box
            sx={{
              marginBottom: ".8rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                fontSize={"1rem"}
                color={theme.palette.secondary.main}
                variant="caption"
              >
                {formatRelativeTime()}
              </Typography>

              <Rating
                sx={{
                  "& .MuiRating-iconFilled, & .MuiRating-iconEmpty": {
                    color: theme.palette.secondary.main,
                  },

                  "&.Mui-disabled": {
                    opacity: 1,
                  },
                }}
                value={comment.rate}
                precision={0.5}
                disabled
              />
            </Box>
            <Typography
              fontSize={".8rem"}
              fontWeight={400}
              color={theme.palette.text.primary}
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
                WebkitLineClamp: 3,
              }}
            >
              {comment.text}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: ".4rem",
              }}
            >
               <CircleAvatar id={comment.owner_id} owner={comment.owner_user} />
              <Typography fontWeight={600}>{comment.owner_user}</Typography>
            </Box>
            <Button
              href={`/movie/${comment.movie_id}`}
              className="hover-button"
              sx={{
                textTransform: "none",
              }}
            >
              View
              <KeyboardDoubleArrowRightIcon />
            </Button>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default CommentedCard;
