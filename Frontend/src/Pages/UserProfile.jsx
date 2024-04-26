import React, { useEffect } from "react";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";

function UserProfile() {
  const [authUser] = useAuth();

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white">
        <Navbar1 />
        <div className="flex-grow my-20">
          <h1 className="text-4xl text-fuchsia-500 font-bold font-serif">
            Welcome ,{" "}
            {authUser.fullname ? (
              <span>{authUser.fullname}</span>
            ) : (
              <span>User</span>
            )}
          </h1>
          <h3 className="mt-5 text-xl text-fuchsia-500">Your Projects - </h3>
          <button className="btn mt-5 btn-outline outline-double text-fuchsia-400 outline-fuchsia-400 rounded-md font-serif text-lg  hover:bg-fuchsia-500 hover:text-white">
            <Link to="/submit">Submit Projects</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
