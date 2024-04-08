import React from 'react';
import Navbar1 from '../components/Navbar1';
import About from '../components/About';
import Footer from '../components/Footer';

function Abouttab() {
    return (
        <>
            <Navbar1 />
            <div className=" min-h-screen">
            <About />
            </div>
            <Footer />
        </>
    );
}

export default Abouttab;