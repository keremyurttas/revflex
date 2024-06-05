import { useParams } from "next/navigation";
import { SetStateAction, useState } from "react";
import { useGlobalContext } from "../Context/store";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import theme from "@/theme/theme";
import { AddCommentProps } from "@/interfaces";

export const AddComment: React.FC<AddCommentProps> = ({ onNewComment }) => {
  const { movieId } = useParams<{ movieId: string }>();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const { createComment, user } = useGlobalContext();

  const handleCommentChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setComment(event.target.value);
  };

  const handleRatingChange = (
    event: React.SyntheticEvent<Element, Event>,
    newRating: number | null
  ) => {
    setRating(newRating);
  };

  const handleSubmit = async () => {
    const newComment = {
      movie_id: movieId,
      text: comment,
      rate: rating,
    };

    if (comment || rating) {
      const createdComment = await createComment(newComment);

      onNewComment(createdComment);

      // Pass the created comment to the parent component

      setComment("");
      setRating(0);
    }
  };

  return (
    <Container sx={{ background: "" }} maxWidth="sm">
      <Box
        sx={{
          marginTop: "2rem",
          padding: "2rem",
          borderRadius: "1rem",
          background: "#080808",
        }}
      >
        <Typography
          color={"primary"}
          sx={{
            [theme.breakpoints.down("lg")]: {
              fontSize: "1.5rem",
            },
          }}
          variant="h4"
          gutterBottom
        >
          Add a Comment and Rating
        </Typography>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
          noValidate
          autoComplete="off"
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Typography color={"primary"} component="legend">
              Rate :
            </Typography>
            <Rating
              name="movie-rating"
              value={rating}
              onChange={handleRatingChange}
              sx={{
                "& .MuiRating-iconFilled, & .MuiRating-iconEmpty": {
                  color: theme.palette.secondary.main,
                },
                "&.Mui-disabled": {
                  opacity: 1,
                },
              }}
              precision={0.5}
            />
          </Box>
          <TextField
            id="comment"
            variant="outlined"
            InputProps={{
              placeholder: "Write your comment here",
            }}
            sx={{
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                {
                  borderColor: theme.palette.text.primary,
                },
            }}
            multiline
            rows={4}
            value={comment}
            onChange={handleCommentChange}
            fullWidth
          />

          <Button
            variant="contained"
            sx={{ color: theme.palette.primary.main }}
            onClick={handleSubmit}
          >
            <Typography sx={{ color: "black" }}>Submit</Typography>
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
