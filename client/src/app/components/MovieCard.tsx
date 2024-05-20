"use client";
import { Box, CardContent, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import theme from "@/theme/theme";
import { ThemeProvider } from "@emotion/react";
import MovieIcon from '@mui/icons-material/Movie';
const MovieCard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Card
        sx={{
          cursor: "pointer",
          width: 200,
          position: "relative",
          height: 400,
          marginTop: "2rem",
          bgcolor: "transparent",
          color: theme.palette.primary.main,
          [theme.breakpoints.down("lg")]: {
            height: 300,
            width: 150,
          },
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "scale(1.05)",
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
          image="https://play-lh.googleusercontent.com/sdg5tqwb-V7YZD9lG1zKbxvmpcVMxY6IHl1rWQLUYHVMvvlfV5yUQQ8RAtnwxA5wc9vIWm6nDCKeWVdv0fU"
        />
        <CardContent sx={{ paddingX: 0 }}>
          <Typography fontSize={".9rem"} fontWeight={600} variant="h5">
            The Green Knight (2021)
          </Typography>
          <Box
            sx={{
              color:theme.palette.text.primary,
              display: "flex",
              alignItems: "center",
              gap: ".2rem",
            }}
          >
            <MovieIcon sx={{ width: 16, height: 16 }} />
            <Typography variant="body1">Fantasy</Typography>
          </Box>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
};
export default MovieCard;
