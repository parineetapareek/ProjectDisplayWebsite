import Project from "../model/project.model.js";

export const createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(200).json(project);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const getProject = async (req, res) => {
  try {
    const project = await Project.find();
    res.status(200).json(project);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

export const displayProject = async (req, res) => {
  const project = await Project.findById(req.params.id);
  console.log(project);
  if (!project) {
    res.status(404).json("No such project exists");
  }
  try {
    res.status(200).json(project);
  } catch (error) {
    console.log("Error: ", error);
    res.status(500).json(error);
  }
};

// import Project from "../model/project.model.js";
// import { errorHandler } from "../utils/error.js";

// export const createProject = async (req, res, next) => {
//   try {
//     const project = await Project.create(req.body);
//     return res.status(201).json(project);
//   } catch (error) {
//     next(error);
//   }
// };

// export const deleteProject = async (req, res, next) => {
//   const project = await Project.findById(req.params.id);

//   if (!project) {
//     return next(errorHandler(404, "Project not found!"));
//   }

//   if (req.user.id !== project.userRef) {
//     return next(errorHandler(401, "You can only delete your own projects!"));
//   }

//   try {
//     await Project.findByIdAndDelete(req.params.id);
//     res.status(200).json("Project has been deleted!");
//   } catch (error) {
//     next(error);
//   }
// };

// export const updateProject = async (req, res, next) => {
//   const project = await Project.findById(req.params.id);
//   if (!project) {
//     return next(errorHandler(404, "Project not found!"));
//   }
//   if (req.user.id !== project.userRef) {
//     return next(errorHandler(401, "You can only update your own Projects!"));
//   }

//   try {
//     const updatedProject = await Project.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.status(200).json(updatedProject);
//   } catch (error) {
//     next(error);
//   }
// };

// export const getProject = async (req, res, next) => {
//   try {
//     const project = await Project.findById(req.params.id);
//     if (!project) {
//       return next(errorHandler(404, "Project not found!"));
//     }
//     res.status(200).json(project);
//   } catch (error) {
//     next(error);
//   }
// };

// // export const getProjects = async (req, res, next) => {
// //   try {
// //     const limit = parseInt(req.query.limit) || 9;
// //     const startIndex = parseInt(req.query.startIndex) || 0;
// //     let offer = req.query.offer;

// //     if (offer === undefined || offer === "false") {
// //       offer = { $in: [false, true] };
// //     }

// //     let furnished = req.query.furnished;

// //     if (furnished === undefined || furnished === "false") {
// //       furnished = { $in: [false, true] };
// //     }

// //     let parking = req.query.parking;

// //     if (parking === undefined || parking === "false") {
// //       parking = { $in: [false, true] };
// //     }

// //     let type = req.query.type;

// //     if (type === undefined || type === "all") {
// //       type = { $in: ["sale", "rent"] };
// //     }

// //     const searchTerm = req.query.searchTerm || "";

// //     const sort = req.query.sort || "createdAt";

// //     const order = req.query.order || "desc";

// //     const listings = await Listing.find({
// //       name: { $regex: searchTerm, $options: "i" },
// //       offer,
// //       furnished,
// //       parking,
// //       type,
// //     })
// //       .sort({ [sort]: order })
// //       .limit(limit)
// //       .skip(startIndex);

// //     return res.status(200).json(listings);
// //   } catch (error) {
// //     next(error);
// //   }
// // };
