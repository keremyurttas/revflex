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
