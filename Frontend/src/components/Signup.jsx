import React from 'react';
import { Link } from 'react-router-dom';
import Login from './Login';
import { useForm } from 'react-hook-form';

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit=(data)=>console.log(data);

  return (
    <>
      <div className='flex h-screen items-center justify-center'>
        <div className='w-[600px]'>
          <div className="modal-box">
            <form onSubmit={handleSubmit(onSubmit)} method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>

              <h3 className="font-bold text-lg">Signup</h3>

              {/* Name */}
              <div className="mt-4 space-y-2">
                <p><span>Name</span></p>
                <p><input type="text" placeholder="Enter Your Full Name" className="w-70 px-3 py-1 border rounded-md outline-none" {...register("fullname", { required: true })} /></p>
                {errors.fullname && (<span className='text-sm text-red-500'>This field is required</span>)}
              </div>

              {/* Email */}
              <div className="mt-4 space-y-2">
                <p><span>Email</span></p>
                <p><input type="email" placeholder="Enter Your Email" className="w-70 px-3 py-1 border rounded-md outline-none" {...register("email", { required: true })} /></p>
                {errors.email && (<span className='text-sm text-red-500'>This field is required</span>)}
              </div>

              {/* Password */}
              <div className="mt-4 space-y-2">
                <p><span>Password</span></p>
                <p><input type="password" placeholder="Enter your password" className="w-70 px-3 py-1 border rounded-md outline-none" {...register("password", { required: true })} /></p>
                {errors.password && (<span className='text-sm text-red-500'>This field is required</span>)}
              </div>

              {/* Button */}
              <div className="flex justify-around mt-4">
                <button className="bg-purple-500 text-white rounded-md px-3 py-1 hover:bg-purple-700 duration-200">Signup</button>
                <p>Have an Account?{" "}<button className="underline text-blue-500 cursor-pointer" onClick={() => document.getElementById("my_modal_3").showModal()}>
                  Login</button>{" "}
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