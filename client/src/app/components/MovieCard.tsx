"use client";
import { Box, Button, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import MovieIcon from "@mui/icons-material/Movie";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

interface MovieCardProps {
  className?: string;
  id: number;
  backdrop_path: string;
  title: string;
  genres: string[];
}
const MovieCard: React.FC<MovieCardProps> = ({
  className,
  id,
  backdrop_path,
  title,
  genres,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        component={"a"}
        href={`/movie/${id}`}
        className={className}
        sx={{
          cursor: "pointer",
          width: 200,
          position: "relative",
          height: 400,
          bgcolor: "transparent",
          color: theme.palette.primary.main,
          [theme.breakpoints.down("lg")]: {
            height: 300,
            width: 150,
          },
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[5],
          },
        }}
      >
        <CardMedia
          component="img"
          alt="green iguana"
          sx={{
            height: 300,
            borderRadius: "8px",
            [theme.breakpoints.down("lg")]: {
              height: 200,
            },
          }}
          image={`https://image.tmdb.org/t/p/w500/${backdrop_path}`}
        />
        <CardContent sx={{ paddingX: 0 }}>
          <Typography fontSize={".9rem"} fontWeight={600} variant="h5">
            {title}
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                color: theme.palette.text.primary,
                display: "flex",
                alignItems: "center",
                gap: ".2rem",
              }}
            >
              <MovieIcon sx={{ width: 16, height: 16 }} />
              <Typography variant="body1">{genres[0]}</Typography>
            </Box>
            <Button
              sx={{
                padding: 0,
                minWidth: 0,
              }}
            >
              <FavoriteBorderIcon fontSize="small" />
            </Button>
          </Box>
        </CardContent>
      </Box>
    </ThemeProvider>
  );
};
export default MovieCard;
