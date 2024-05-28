import mongoose from "mongoose";

const { Schema, Types } = mongoose;

const commentSchema = new Schema({
  owner_user: { type: String, required: true },
  movie_id: { type: String, required: true },
  text: { type: String },
  rate: { type: Number },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
