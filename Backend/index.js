import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import projectRoute from "./route/project.route.js";
import userRoute from "./route/user.route.js";

import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT=process.env.PORT || 3001;
const URI=process.env.MongoDBURI;

//connect to MongoDB
try{
  mongoose.connect(URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to mongoDB");
}catch(error){
  console.log("error: ", error);
}

//defining routes
app.use("/project", projectRoute);
app.use("/user", userRoute);

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});