import mongoose from "mongoose";
import express from "express";

if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI environment variable is not set.");
}
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("DB connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

mongoose.connection.on("error", (error) => {
  console.log("database connection error: ", error);
});

const app = express();
