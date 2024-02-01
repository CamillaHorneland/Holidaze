import React from "react";
import ImageBack from "../landing/background"; 
import { Link } from "react-router-dom"; 
import VenueFilter from "../venues/VenueFilter";

const Home = () => {
  return (
    <div>
      <div className="relative mb-5">
        <ImageBack big />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full z-20">
          <div className="lg:flex lg:flex-col lg:items-center lg:w-2/3 xl:w-1/2 mx-auto">
            <h1 className="text-white text-3xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 mt-10">
              Travel the world with Holidaze
            </h1>
            <h2 className="text-white text-base sm:text-lg lg:text-2xl xl:text-3xl mb-10">
              Secure your venue for your upcoming trip here
            </h2>
          </div>
        </div>
      </div>

      <div className="mb-16 lg:mx-auto">
        <VenueFilter />
      </div>

      <div className="text-center mb-16">
        <Link to="/venues" className="bg-dark-blue text-white py-4 px-10 rounded-full cursor-pointer
           transition duration-300 ease-in-out hover:bg-blue">
           Or Explore All Venues
        </Link>
      </div>
    </div>
  );
};

export default Home;



