import React from "react";
import { Link } from "react-router-dom";
import { useUser } from "../../../hooks/type/UserContext";

function InfoVenueManager() {
  const { user } = useUser();
  const isVenueManager = user && (user.isVenueManager || user.venueManager);

  return (
    <div className="text-dark-blue mb-16 p-4">
      {!user || !user.isLoggedIn ? (
        <>
          <h2 className="text-2xl text-center">Ever dreamed of managing your own venue?</h2>
          <h3 className="m-10">Whether you have a mountain cabin or a sunny apartment lying vacant, seize the opportunity to become a Venue Manager today!</h3>
          <h3 className="m-10">Turn your space into a thriving venue and earn money by renting it out under secure conditions. Join us in creating memorable experiences for others while benefiting from a hassle-free booking process.</h3>
          <div className="text-center m-16">
            <Link to="/register" className="bg-blue text-white py-4 px-10 rounded-full cursor-pointer
            hover:bg-dark-blue">Register now</Link>
          </div>
        </>
      ) : !isVenueManager ? (
        <>
          <h2 className="text-2xl text-center">Ever dreamed of managing your own venue?</h2>
          <h3 className="m-10">Whether you have a mountain cabin or a sunny apartment lying vacant, seize the opportunity to become a Venue Manager today!</h3>
          <h3 className="m-10">Turn your space into a thriving venue and earn money by renting it out under secure conditions. Join us in creating memorable experiences for others while benefiting from a hassle-free booking process.</h3>
          <div className="text-center m-16">
            <Link to={`/profile/${user.name}`}className="bg-blue text-white py-4 px-10 rounded-full cursor-pointer
            hover:bg-dark-blue">Become a Venue Manager</Link>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default InfoVenueManager;
