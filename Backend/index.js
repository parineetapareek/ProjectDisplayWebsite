import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoute from "./route/user.route.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

// import projectRoute from "./route/project.route.js";

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error(err);
  });

app.use("/user", userRoute);

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});

//defining routes
// app.use("/project", projectRoute);

// app.use((err, req, res, next) => {
//   const statusCode = err.statusCode || 500;
//   const message = err.message || "Internal Server Error";
//   return res.status(statusCode).json({
//     success: false,
//     statusCode,
//     message,
//   });
// });
