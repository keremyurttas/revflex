import mongoose from "mongoose";

const { Schema } = mongoose;

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
  avatar: { type: String },
});
const User = mongoose.model("User", userSchema);

export default User;
