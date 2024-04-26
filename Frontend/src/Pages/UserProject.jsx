import React, { useEffect, useState } from "react";
import Navbar1 from "../components/Navbar1";
import Footer from "../components/Footer";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

function UserProject() {
  const [project, setProject] = useState(null);

  useEffect(() => {
    const show = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/project/display/662a7ed1b6bdb5b7b54351f1"
        );
        const projectData = response.data;
        console.log("API Response: " + JSON.stringify(projectData));
        setProject(projectData);
      } catch (error) {
        console.log(error);
      }
    };
    show();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row w-full min-h-screen max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-900 dark:text-white">
        <Navbar1 />
        <div className="flex-grow my-20">
          {project && (
            <>
              <div className="flex mb-10">
                <div className="w-1/2">
                  <h1 className="text-5xl font-serif text-blue-500 font-medium mb-7">
                    {project.projectName}
                  </h1>
                  {/* <p>Created By: {project.userID}</p> */}
                  <p className="text-lg mb-2">
                    <span className="text-2xl text-blue-400">Branch:</span>{" "}
                    {project.branch}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="text-2xl text-blue-400">College:</span>{" "}
                    {project.college}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="text-2xl text-blue-400">Category:</span>{" "}
                    {project.category}
                  </p>
                  <p className="text-lg mb-2">
                    <span className="text-2xl text-blue-400">Difficulty:</span>{" "}
                    {project.difficulty}
                  </p>
                </div>
                <div className="max-w-screen-sm">
                  <p className="text-2xl mb-5">
                    <span className="text-2xl text-blue-400">
                      Snapshots of Project:
                    </span>{" "}
                  </p>
                  <Slider {...settings}>
                    {project.image.map((imageUrl, index) => (
                      <div key={index}>
                        <img
                          src={imageUrl}
                          alt={`image${index}`}
                          className="w-75"
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
              <div>
                <span className="text-2xl text-blue-400">Description:</span>
                <p className="text-lg mb-2 max-w-screen-lg">
                  {project.description}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProject;
