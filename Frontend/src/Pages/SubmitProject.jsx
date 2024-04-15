import React from 'react';
import Navbar1 from '../components/Navbar1';
import Footer from '../components/Footer';

function submitProject() {
  return (<>
  <div className='flex flex-col min-h-screen'>
  <Navbar1/>
  <div className='flex-grow'>submitProject</div>
  <Footer/>
  </div>
  </>
    
  )
}

export default submitProject;