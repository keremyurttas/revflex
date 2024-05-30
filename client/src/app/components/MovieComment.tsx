import theme from "@/theme/theme";
import { Box, Avatar, Typography, Rating, Button } from "@mui/material";
import { Comment, MovieCommentProps } from "@/interfaces";
import { useGlobalContext } from "../Context/store";

export const MovieComment: React.FC<MovieCommentProps> = ({
  comment,
  deleteCommentLocal,
}) => {
  const { user } = useGlobalContext();
  const formattedDate = (date: number) => {
    return new Date(date)
      .toLocaleDateString("en-US", {
        month: "short", // Short month name (e.g., "May")
        day: "2-digit", // Two-digit day of the month (e.g., "29")
        year: "numeric", // Full year (e.g., "2024")
      })
      .toUpperCase();
  };
  const handleDelete = async () => {
    const response = await fetch(
      `http://localhost:8000/api/movies/${comment.movie_id}/comments/${comment._id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      deleteCommentLocal(comment._id);
    } else {
      console.error("Failed to delete comment:", response.statusText);
    }
  };

  return (
    <Box marginBottom={2}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        marginBottom={".5rem"}
      >
        <Box display={"flex"} gap={"1rem"}>
          <Avatar />
          <Typography
            color={comment.owner_id === user.id ? "secondary" : "primary"}
            variant="body2"
            fontSize={"1.5rem"}
          >
            @{comment.owner_user}
          </Typography>
        </Box>
        <Box>
          {comment.owner_id === user.id && (
            <Button color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          )}
          <Typography variant="body2">{formattedDate(comment.date)}</Typography>
        </Box>
      </Box>
      <Box>
        <Rating
          sx={{
            "& .MuiRating-iconFilled, & .MuiRating-iconEmpty": {
              color: theme.palette.secondary.main,
            },
            "&.Mui-disabled": { opacity: 1 },
          }}
          value={comment.rate}
          precision={0.5}
          disabled
        />
        <Typography>{comment.text}</Typography>
      </Box>
    </Box>
  );
};
