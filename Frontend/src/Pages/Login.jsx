import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import { useAuth } from "../context/AuthProvider";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";
  const [, handleLogin] = useAuth();

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
      const userInfo = {
        email: data.email,
        password: data.password,
      };

      const response = await axios.post(
        "http://localhost:3000/User/login",
        userInfo
      );
      const userData = response.data.user;
      toast.success("Login Successful!");
      handleLogin(userData);
      reset();
      navigate(from, { replace: true });
      window.location.reload();
    } catch (err) {
      if (err.response) {
        toast.error("Error: " + err.response.data.message);
      } else {
        toast.error("An error has occured during Login");
      }
    }
  };

  return (
    <>
      <div>
        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              <Link
                to="/"
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => document.getElementById("my_modal_3").close()}
              >
                ✕
              </Link>

              <h3 className="font-bold text-lg">Login</h3>

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
                  className="W-70 px-3 py-1 border rounded-md outline-none"
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
              <div className="flex justify-around mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-500 text-white rounded-md px-3 py-1 hover:bg-purple-700 duration-200"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
                <p className="flex">
                  Not Registered?{" "}
                  <Link
                    to="/signup"
                    className="underline text-blue-500 cursor-pointer"
                    onClick={() =>
                      document.getElementById("my_modal_3").close()
                    }
                  >
                    Sign-up
                  </Link>{" "}
                </p>
              </div>
            </form>
          </div>
        </dialog>
      </div>
    </>
  );
}

export default Login;
