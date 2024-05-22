import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import jobRouter from "./routes/job.route.js";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import applyRouter from "./routes/apply.route.js";
import cookieParser from "cookie-parser";

dotenv.config();
const PORT = process.env.PORT || 3001;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Connected to MongoDb");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use("/api/job", jobRouter);
app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/apply", applyRouter);

app.listen(PORT, () => {
  console.log(`Server Running ${PORT}`);
});
