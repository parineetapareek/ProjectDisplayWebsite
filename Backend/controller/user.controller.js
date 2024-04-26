import Project from "../model/project.model.js";
import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return next(errorHandler(400, "User Already exists"));
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname,
      email,
      password: hashPassword,
    });
    await createdUser.save();
    const token = jwt.sign({ id: createdUser._id }, process.env.JWT_SECRET);
    res.cookie("access_token", token, { httpOnly: true });
    res.status(201).json({
      message: "User Created Successfully!",
      user: {
        _id: createdUser._id,
        fullname: createdUser.fullname,
        email: createdUser.email,
      },
    });
  } catch (error) {
    console.log("Error: " + error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user) {
      return next(errorHandler(400, "Invalid Email"));
    } else if (!isMatch) {
      return next(errorHandler(400, "Invalid Password"));
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json({
          message: "Login Successful",
          user: {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
          },
        });
    }
  } catch (error) {
    console.log("Error: " + error.message);
    next(error);
  }
};

export const getUserProject = async (req, res, next) => {
  const userID = req.params.id;
  console.log(userID);
  console.log(req.user.id);
  if (userID !== req.user.id) {
    return next(errorHandler(401, "You can only view your own projects"));
  }
  try {
    const projects = await Project.find({ userRef: userID });
    res.status(200).json(projects);
    console.log(projects);
  } catch (error) {
    console.log("Error: ", error);
    next(error);
  }
};
