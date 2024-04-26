import React from "react";
import { BrowserRouter, Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Browse from "./Pages/Browse";
import SubmitProject from "./Pages/SubmitProject";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";
import UserProfile from "./Pages/UserProfile";
import UserProject from "./Pages/UserProject";

function App() {
  const [authUser, setAuthUser] = useAuth();

  return (
    <>
      <BrowserRouter>
        <div className="dark:bg-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route
              path="/browse"
              element={authUser ? <Browse /> : <Navigate to="/signup" />}
            />
            <Route path="/submit" element={<SubmitProject />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/userproject" element={<UserProject />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
