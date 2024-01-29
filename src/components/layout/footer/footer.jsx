import React from "react";
import { Link } from "react-router-dom";
import { FaFacebookSquare, FaInstagramSquare, FaSnapchatSquare } from "react-icons/fa";
import { useUser } from "../../type/UserContext";

function Footer() {
  const { user } = useUser();

  return (
    <div className="relative bottom-0 w-full bg-light-blue h-38 flex flex-col items-center justify-center p-4">
      <div className="text-black m-3 mb-4">
        <Link to="/contact">Contact us</Link>
      </div>
       {user && user.isLoggedIn && (
        <>
        <div className="text-black m-3 mb-8">
          <Link to="/profile">Become a Venue Manager</Link>
        </div>
        </>
      )}
      <div className="text-black m-3 mb-8">
        &copy; {new Date().getFullYear()} Holidaze.
      </div>
      <div className="absolute bottom-1 right-4 flex space-x-5 pt-8">
        <a href="https://www.facebook.com" className="text-black text-2xl mr-2">
          <FaFacebookSquare />
        </a>
        <a href="https://www.instagram.com" className="text-black text-2xl mr-2">
          <FaInstagramSquare />
        </a>
        <a href="https://www.snapchat.com" className="text-black text-2xl mr-2">
          <FaSnapchatSquare />
        </a>
      </div>
    </div>
  );
}

export default Footer;











