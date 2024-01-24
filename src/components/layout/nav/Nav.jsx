import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenuAlt2 } from "react-icons/hi";

const Nav = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="sm:flex sm:items-center sm:justify-between bg-blue p-4">
      <HiMenuAlt2 className="m-6 text-5xl cursor-pointer sm:hidden text-white" onClick={handleToggleMobileMenu} />
      <ul className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:flex sm:space-x-4 text-white ml-auto`}>
        <li className="m-4 group">
          <NavLink to="/" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </NavLink>
        </li>
        <li className="m-4 group">
          <NavLink to="/venues" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
            setIsMobileMenuOpen(false);
            navigate('/venues', { replace: true });
          }}>
            Venues
          </NavLink>
        </li>
        <li className="m-4 group">
          <NavLink to="/login" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
            setIsMobileMenuOpen(false);
            navigate('/login', { replace: true });
          }}>
            Login
          </NavLink>
        </li>
        <li className="m-4 group">
          <NavLink to="/register" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
            setIsMobileMenuOpen(false);
            navigate('/register', { replace: true });
          }}>
            Register
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;

















