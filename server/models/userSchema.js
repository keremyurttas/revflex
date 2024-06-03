import mongoose from "mongoose";
import avatarSchema from './avatarSchema.js'; 

const { Schema } = mongoose;

const likedMovieSchema = new Schema({
  movie_id: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  prefferedName: {
    type: String,
    required: true,
  },
  genres: {
    type: Array,
    required: true,
  },
  avatar: avatarSchema,
  likedMovies: {
    type: [likedMovieSchema],
    default: [],
  },
});
const User = mongoose.model("User", userSchema);

export default User;
