import Comment from "../models/comment.js";
export const createComment = (req, res) => {
  const comment = new Comment(req.body);

  comment
    .save()
    .then((result) => {
      res.json({ post: result });
    })
    .catch((err) => {
      res.status(400).json({ error: err.message });
    });
};

export const getCommentsByMovieId = async (req, res) => {
  const { movie_id } = req.params;
  try {
    // Fetch comments for the given movie ID
    const comments = await Comment.find({ movie_id });

    // Respond with the comments
    res.status(200).json({ ...comments });
  } catch (error) {
    console.error("Error fetching comments:", error);

    // Respond with an error message and status code 500 (Internal Server Error)
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};
