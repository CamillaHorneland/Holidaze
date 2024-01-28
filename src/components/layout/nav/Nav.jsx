import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useUser } from '../../type/UserContext'; 
import Logo from '../header/header'; 

const Nav = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
 
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isVenueManager = user && user.isVenueManager;

   const handleLogout = () => {
    clearUser();
    navigate('/login');
  };

  return (
    <nav className="sm:flex sm:items-center sm:justify-between bg-blue p-4">
      <Logo />
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
        {user && user.role === 'guest' && (
          <>
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
          </>
        )}
        {user && user.isLoggedIn && (
          <>
            <li className="m-4 group">
              <NavLink to="/bookings" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/bookings', { replace: true });
              }}>
                Bookings
              </NavLink>
            </li>
            <li className="m-4 group">
              <NavLink to="/profile" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/profile', { replace: true });
              }}>
                Profile
              </NavLink>
            </li>
            <li className="m-4 group">
              <NavLink to="/logout" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
                  setIsMobileMenuOpen(false);
                  //logoutfunction
                }}>
                  Logout
              </NavLink>
            </li>

          </>
        )}
        {isVenueManager && (
          <>
            <li className="m-4 group">
              <NavLink to="/your-venues" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/your-venues', { replace: true });
              }}>
                Your Venues
              </NavLink>
            </li>
            <li className="m-4 group">
              <NavLink to="/add-venues" className="active mx-4 group-hover:underline text-lg font-bold" onClick={() => {
                setIsMobileMenuOpen(false);
                navigate('/add-venues', { replace: true });
              }}>
                Add Venues
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;





























