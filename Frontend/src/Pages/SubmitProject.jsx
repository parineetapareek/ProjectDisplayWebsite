import React, { useState } from "react";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import axios from "axios";
import { app } from "../firebase";
import {
  getStorage,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
// import { useSelector } from "react-redux";

function SubmitProject() {
  // const { currentUser } = useSelector((state) => state.user);

  const [currentUser] = useAuth();
  console.log(currentUser);

  const navigate = useNavigate();

  const [files, setFiles] = useState([]);

  const [formData, setFormData] = useState({
    projectName: "",
    branch: "",
    college: "",
    category: "",
    description: "",
    difficulty: "",
    image: [],
  });

  const [error, setError] = useState(false);

  const [imageUploadError, setImageUploadError] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    try {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
      setError("");
    } catch (error) {
      setError("An error occured while updating the project name");
      console.log(error);
    }
  };

  const handleDifficultyChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, difficulty: value });
  };

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.image.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            image: formData.image.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
          toast.success("Image Uploaded Successfully!!");
        })
        .catch((err) => {
          setImageUploadError("Image  Upload Failed!", err);
          toast.error(imageUploadError);
          setUploading(false);
        });
    } else {
      if (files.length === 0) {
        setImageUploadError("Please Select an Image to upload");
      } else if (files.length > 6) {
        setImageUploadError("You can only Upload 6 images per Project");
      }
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`uploading ${progress}%`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      image: formData.image.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!currentUser || !currentUser._id) {
      setError("User Information not available");
      return;
    }

    const requiredFields = [
      "projectName",
      "branch",
      "college",
      "category",
      "description",
      "difficulty",
    ];
    for (const field of requiredFields) {
      if (!formData[field].trim()) {
        setError(
          `Please fill out the ${field.replace(/^\w/, (c) =>
            c.toUpperCase()
          )} field`
        );
        return;
      }
    }

    try {
      setLoading(true);
      setError(false);

      const response = await axios.post(
        "http://localhost:3000/project/create",
        {
          ...formData,
          userRef: currentUser._id,
        }
      );
      // console.log(userRef);
      console.log(currentUser._id);
      const data = response.data;
      console.log(data);
      toast.success("Project Submitted Successfully!!");
      navigate("/profile");
      // window.location.href = "/profile";
      // const data = await response.json();
      console.log(response);

      setLoading(false);
      if (data.success === false) {
        setError(data.message);
      }
      //navigate(`/browse/${data._id}`);
    } catch (error) {
      setError(error.message);
      setLoading(false);
      if (error.response) {
        toast.error("Error: " + setError);
      } else {
        toast.error("An error occured during submitting");
      }
    }
    console.log("Form Submitted!");
    console.log("Form Data: ", formData);
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white">
        <Navbar1 />
        <div className="mt-20 flex-grow">
          <h1 className="text-4xl text-gray-700 font-serif  justify-center dark:text-white">
            Submit Project
          </h1>
          <form className="flex flex-wrap" onSubmit={handleSubmit}>
            <div className="w-1/2">
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text  dark:text-white">
                    Project Name
                  </span>
                </div>
                <input
                  type="text"
                  name="projectName"
                  value={formData.projectName}
                  onChange={handleInputChange}
                  placeholder="Enter Project Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text dark:text-white">
                    Your Branch{" "}
                  </span>
                </div>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  placeholder="Enter Your Branch"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text dark:text-white">
                    Your College
                  </span>
                </div>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  placeholder="Enter Your College Name"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text dark:text-white">
                    Category Of Your Project
                  </span>
                </div>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  placeholder="Enter Project Category"
                  className="input input-bordered w-full max-w-xs"
                />
              </label>
              <label className="form-control">
                <div className="label">
                  <span className="label-text dark:text-white">
                    Project Description
                  </span>
                </div>
                <textarea
                  className="textarea textarea-bordered h-24 max-w-xs"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter Project Description"
                ></textarea>
              </label>
              <label className="form-control w-full max-w-xs">
                <div className="label">
                  <span className="label-text dark:text-white">
                    Select the Difficulty Level
                  </span>
                </div>
                <select
                  className="select select-bordered dark:bg-slate-900 dark:text-white dark:select-bordered dark:border-white"
                  value={formData.difficulty}
                  onChange={handleDifficultyChange}
                >
                  <option disabled value="">
                    Select Difficulty Level
                  </option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Hard">Hard</option>
                </select>
              </label>
            </div>
            <div className="w-1/2">
              <div className="mb-5">
                <label className="form-control w-full max-w-xs">
                  <div className="label">
                    <span className="label-text dark:text-white">
                      Pick Images of Your Project to Display
                    </span>
                    <span className="label-text-alt dark:text-white">
                      (Max-6)
                    </span>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="file-input file-input-bordered w-full max-w-xs dark:text-black"
                    onChange={(e) => setFiles(e.target.files)}
                    multiple
                  />
                  <button
                    disabled={uploading}
                    onClick={handleImageSubmit}
                    className="p-2 font-mono font-semibold text-normal bg-gray-700 text-white border rounded-lg"
                  >
                    {uploading ? "UPLOADING..." : "UPLOAD"}
                  </button>
                </label>
              </div>

              <p className="text-red-700 text-sm">
                {imageUploadError && imageUploadError}
              </p>
              {formData.image.map((url, index) => (
                <div
                  key={url}
                  className="flex justify-between border items-center"
                >
                  <img
                    src={url}
                    alt="Project Image"
                    className="w-20 h-20 object-contain rounded-lg"
                  />
                  <button
                    onClick={() => handleRemoveImage(index)}
                    className="text-red-700 rounded-lg uppercase hover:opacity-75"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {error && <div className="text-red-500">{error}</div>}
              <div className="flex flex-cols">
                <div className=" pr-2 w-1/4">
                  <button
                    disabled={loading || uploading}
                    type="submit"
                    className="btn mt-5 btn-outline outline-double font-serif text-lg"
                  >
                    {loading ? "Submitting..." : "Submit"}
                  </button>
                </div>
                <div>
                  <button className="btn mt-5 btn-outline outline-double font-serif text-lg ">
                    <Link to="/profile">Cancel</Link>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SubmitProject;
