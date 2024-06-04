"use client";
import { useEffect, useState } from "react";
import { useGlobalContext } from "../Context/store";
import { ThemeProvider } from "@emotion/react";
import theme from "@/theme/theme";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CommentedCard from "../components/CommentedCard";
import { Comment } from "@/interfaces";

const Rated = () => {
  const { user } = useGlobalContext();
  const [comments, setComments] = useState<Comment[]>([]);

  const fetchCommentsByUserId = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/${user.id}/comments`,
        {
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const commentsById = await response.json();
      setComments(commentsById);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (user.id) {
      fetchCommentsByUserId();
    }
  }, [user]);

  if (!comments) {
    return "Loading"; // or return loading indicator, error message, etc.
  }

  return (
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
        {comments && comments.length > 0 ? (
          <Grid container spacing={2}>
            {comments.map((comment) => (
              <Grid item xs={12} sm={6} md={4} lg={12} xl={6} key={comment._id}>
                <CommentedCard comment={comment} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography sx={{ fontSize: "2rem" }}>
            You haven't commented any movies yet.
          </Typography>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default Rated;
