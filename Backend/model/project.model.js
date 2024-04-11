import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    name: String,
    branch: String,
    category: String,
    rating: Number,
    difficulty: String,
    image: String,
});

const Project  = mongoose.model("Project", projectSchema);

export default  Project;