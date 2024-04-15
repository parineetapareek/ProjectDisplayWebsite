import express from "express";
// import { getProject } from "../controller/project.controller.js";
import {
  createProject,
  deleteProject,
  updateProject,
  getProject,
} from "../controller/project.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createProject);
router.delete("/delete/:id", verifyToken, deleteProject);
router.post("/update/:id", verifyToken, updateProject);
router.get("/get/:id", getProject);

export default router;
