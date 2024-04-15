import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Login from "./Login";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthProvider";

function Signup() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [, handleSignup] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        data
      );
      const userData = response.data;
      console.log(userData);

      toast.success("Signup Successful!");
      handleSignup(userData);
      reset();
      navigate(from, { replace: true });
      window.location.reload();
    } catch (err) {
      setLoading(false);
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An error occurred during signup");
      }
    }
  };

  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="w-[600px]">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Signup</h3>

              {/* Name */}
              <div className="mt-4 space-y-2">
                <label htmlFor="fullname">Name</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter Your Full Name"
                  className="w-70 px-3 py-1 border rounded-md outline-none"
                  {...register("fullname", { required: true })}
                />
                <br />
                {errors.fullname && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <label htmlFor="email">Email Address</label>
                <br />
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-70 px-3 py-1 border rounded-md outline-none"
                  {...register("email", { required: true })}
                />
                <br />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <label htmlFor="password">Password</label>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="w-70 px-3 py-1 border rounded-md outline-none"
                  {...register("password", { required: true })}
                />
                <br />
                {errors.password && (
                  <span className="text-sm text-red-500">
                    This field is required
                  </span>
                )}
              </div>

              {/* Button */}
              <div className="flex justify-around mt-4">
                <button
                  type="submit"
                  className="bg-purple-500 text-white rounded-md px-3 py-1 hover:bg-purple-700 duration-200"
                  disabled={loading}
                >
                  {loading ? "Signing up..." : "Signup"}
                </button>
                <p className="text-xl">
                  Have an Account?{" "}
                  <button
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").showModal()
                    }
                  >
                    Login
                  </button>{" "}
                  <Login />
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
