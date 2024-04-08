import React from 'react';
import Navbar1 from '../components/Navbar1';
import Banner from '../components/Banner';
import FeaturedProject from '../components/FeaturedProject';
import Footer from '../components/Footer';

function Home() {
  return (<>
  <Navbar1/>
  <Banner/>
  <FeaturedProject/>
  <Footer/>
  </>
  )
}

export default Home;