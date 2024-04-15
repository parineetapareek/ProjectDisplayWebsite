import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Browse from "./Pages/Browse";
import SubmitProject from "./Pages/SubmitProject";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="dark:bg-slate-900 dark:text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/browse" element={<Browse />} />
            <Route path="/submit" element={<SubmitProject />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
          <Toaster />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;

// import React from "react";
// import Home from "./Home/Home";
// import { Navigate, Routes, Route, BrowserRouter } from "react-router-dom";
// import Browsetab from "./Browse/Browsetab";
// import Signup from "./components/Signup";
// import Abouttab from "./About/Abouttab";
// import { Toaster } from "react-hot-toast";
// import { useAuth } from "./context/AuthProvider";

// function App() {
//   const [authUser, setAuthUser] = useAuth();
//   console.log(authUser);
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <div className="dark:bg-slate-900 dark:text-white">
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<Abouttab />} />
//             <Route
//               path="/browse"
//               element={authUser ? <Browsetab /> : <Navigate to="/signup" />}
//             />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/submit" element={<submitProject />}/>

//             <Toaster />
//           </div>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }

// export default App;
