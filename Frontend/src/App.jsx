import React from 'react';
import Home from './Home/Home';
import { Routes, Route } from "react-router-dom"
import Browsetab from './Browse/Browsetab';
import Signup from './components/Signup';
import Abouttab from './About/Abouttab';

function App() {
  return (<>

    <div className="dark:bg-slate-900 dark:text-white">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/about' element={<Abouttab/>}/>
        <Route path="/browse" element={<Browsetab />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>

  </>);
}

export default App;