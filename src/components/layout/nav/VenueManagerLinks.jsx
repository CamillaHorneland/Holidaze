import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const VenueManagerLinks = ({ closeMobileMenu }) => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setShowSubMenu(true);
  };

  const handleMouseLeave = () => {
    setShowSubMenu(false);
  };

  const handleLinkClick = () => {
    closeMobileMenu();
    setShowSubMenu(false);
  };

  return (
    <li
      className="z-20"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}>
      <div
        className="mx-4 m-2 group transition-all border border-white rounded-md px-2 p-2 relative"
        onClick={handleMouseEnter} >
        Venue Manager
        {showSubMenu && (
          <div
            className="absolute top-full left-1/2 transform -translate-x-1/2 bg-white text-black p-2 space-y-2 border border-blue rounded-md transition-opacity duration-300 w-56 text-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}>
            <NavLink
              to="/YourVenues"
              className={`block transition-all text-blue ${location.pathname === '/YourVenues' ? 'text-lg' : ''}`}
              onClick={handleLinkClick}>
              Your Venues
            </NavLink>
            <NavLink
              to="/AddVenue"
              className={`block transition-all text-blue ${location.pathname === '/AddVenue' ? 'text-lg' : ''}`}
              onClick={handleLinkClick}>
              Add Venues
            </NavLink>
          </div>
        )}
      </div>
    </li>
  );
};

export default VenueManagerLinks;







