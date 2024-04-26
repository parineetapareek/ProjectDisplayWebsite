import express from "express";
import {
  signup,
  login,
  getUserProject,
} from "../controller/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getproject/:id", verifyToken, getUserProject);

export default router;
