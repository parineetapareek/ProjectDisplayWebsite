import React from "react";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";

function About() {
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar1 />
        <div className="flex-grow max-w-screen-2xl container mx-auto md:px-20 px-4 grid">
          <div className=" w-full mt-28 items-center justify-center text-center">
            <h1 className=" text-2xl md:text-4xl">About us</h1>
            <p className="mt-7">
              Many students struggle to effectively showcase their academic and
              personal projects, hindering their ability to demonstrate their
              skills and accomplishments to potential employers or academic
              institutions. This lack of visibility can limit opportunities for
              career advancement or further education . While Facing the Same
              Problems, We Decided to Take Action. Our solution was to develop a
              comprehensive online platform where students can easily create
              profiles and showcase their projects in a professional manner.
              This solution highlights the benefits of the proposed solution,
              such as increased visibility and opportunities for students, which
              align with the objectives of your project.
            </p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default About;
