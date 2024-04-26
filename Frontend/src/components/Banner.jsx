import React from "react";
import banner from "../../public/Banner.png";

function Banner() {
  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row my-1">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-15 md:mt-36">
          <div className="space-y-7 mb-10">
            <h1 className="text-2xl md:text-4xl font-bold">
              Welcome to the Innovation Playground: Where Student's Project
              <span className="text-fuchsia-400"> Shine Bright!</span>
            </h1>
            <p className="text-sm md:text-xl">
              As students, we face challenges in effectively presenting our
              projects to potential employers or academic institutions. Existing
              platforms often don't provide the tools or visibility we need to
              showcase our skills and achievements properly. So here's your one
              stop solution- Prollaborate.
              <p>
                In our Website You can -
                <ul>
                  <li>View Projects of students of different disciplines</li>
                  <li>Submit your own Projects.</li>
                </ul>
              </p>
            </p>
          </div>
        </div>
        <div className="order-1 w-full mt-20 md:w-1/2">
          <img
            src={banner}
            className="md:w-[550px] md:h-[460px] md:ml-12 "
            alt=""
          />
        </div>
      </div>
    </>
  );
}

export default Banner;
