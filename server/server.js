import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import router from "./routes/index.js";

// const jwtSecret = process.env.JWT_SECRET;
const corsOptions = {
  origin:
    process.env.NODE_ENV === "production"
      ? "https://revflix.vercel.app"
      : "http://localhost:3000",
  credentials: true, // This is important for setting cookies
};

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
const PORT = process.env.PORT || 8000;
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
