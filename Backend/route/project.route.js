import express from "express";
import { createProject, displayProject, getProject } from "../controller/project.controller.js";

// import { getProject } from "../controller/project.controller.js";
// import {
//   createProject,
//   deleteProject,
//   updateProject,
//   getProject,
// } from "../controller/project.controller.js";
// import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post("/create", createProject);
router.get("/get", getProject);
router.get("/display/:id", displayProject);
// router.delete("/delete/:id", verifyToken, deleteProject);
// router.post("/update/:id", verifyToken, updateProject);
// router.get("/get/:id", getProject);

export default router;
