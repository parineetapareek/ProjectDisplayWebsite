import User from "../model/user.model.js";
import bcryptjs from "bcryptjs";

// import { errorHandler } from "../utils/error.js";
// import Project from "../model/project.model.js";

// export const test = (req, res) => {
//   res.json({
//     message: "API route is working!!",
//   });
// };

// export const updateUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id)
//     return next(errorHandler(401, "You can only update Your own account!!"));
//   try {
//     if (req.body.password) {
//       req.body.password = bcryptjs.hashSync(req.body.password, 10);
//     }

//     const updateUser = await User.findByIdAndUpdate(
//       req.params.id,
//       {
//         $set: {
//           fullname: req.body.fullname,
//           email: req.body.email,
//           password: req.body.password,
//         },
//       },
//       { new: true }
//     );
//     const { password, ...rest } = updateUser._doc;

//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteUser = async (req, res, next) => {
//   if (req.user.id !== req.params.id)
//     return next(errorHandler(401, "You can only delete your own account!!"));
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.clearCookie("access_token");
//     res.status(200).json("User has been Deleted!!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const getUserProjects = async (req, res, next) => {
//   if (req.user.id === req.params.id) {
//     try {
//       const Project = await Project.find({ userRef: req.params.id });
//       res.status(200).json(Project);
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     return next(errorHandler(401, "You can only view your own Projects!"));
//   }
// };

// export const getUser = async (req, res, next) => {
//   try {
//     const user = await User.findById(req.params.id);

//     if (!user) return next(errorHandler(404, "User not found!"));

//     const { password: pass, ...rest } = user._doc;

//     res.status(200).json(rest);
//   } catch (error) {
//     next(error);
//   }
// };

export const signup = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already Exists" });
    }
    const hashPassword = await bcryptjs.hash(password, 10);
    const createdUser = new User({
      fullname: fullname,
      email: email,
      password: hashPassword,
    });
    await createdUser.save();
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!user || !isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    } else {
      res.status(200).json({
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
    res.status(500).json({ message: "Internal Server Error" });
  }
};
