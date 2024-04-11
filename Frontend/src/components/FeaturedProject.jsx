import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import Cards from "./Cards";
function FeaturedProject() {
  const [project, setProject] = useState([]);
  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get("http://localhost:3000/project");
        console.log(res.data);
        setProject(res.data.filter((data) => data.rating >= 4));
      } catch (error) {
        console.log(error);
      }
    };
    getProject();
  }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div>
          <h1 className="font-semibold text-xl pb-2">Featured Projects</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Error
            architecto fugiat nobis amet sapiente reprehenderit distinctio.
            Impedit minus alias recusandae.
          </p>
        </div>
        <div>
          <Slider {...settings}>
            {project.map((item) => (
              <Cards key={item.id} item={item} />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
}

export default FeaturedProject;
