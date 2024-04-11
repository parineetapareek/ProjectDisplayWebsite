import React from "react";
import Home from "./Home/Home";
import { Navigate, Routes, Route } from "react-router-dom";
import Browsetab from "./Browse/Browsetab";
import Signup from "./components/Signup";
import Abouttab from "./About/Abouttab";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider";

function App() {
  const [authUser, setAuthUser] = useAuth();
  console.log(authUser);
  return (
    <>
      <div className="dark:bg-slate-900 dark:text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Abouttab />} />
          <Route
            path="/browse"
            element={authUser ? <Browsetab /> : <Navigate to="/signup" />}
          />
          <Route path="/signup" element={<Signup />} />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;