import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { HiMenuAlt2 } from 'react-icons/hi';
import { useUser } from '../../../hooks/type/UserContext'; 
import { useUserActions } from '../../../hooks/type/UserStore'; 
import VenueManagerLinks from './VenueManagerLinks'; 

const Nav = () => {
  const [isLogoutConfirmed, setIsLogoutConfirmed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const { clearUser } = useUserActions();
 
  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const isVenueManager = user && (user.isVenueManager || user.venueManager);

  const handleLogout = () => {
    if (isLogoutConfirmed) {
      clearUser();
      navigate('/login');
    } else {
      setIsLogoutConfirmed(true);
    }
  };

  useEffect(() => {
    setIsLogoutConfirmed(false);
  }, [user]);

  return (
    <nav className="sm:flex sm:items-center sm:justify-between bg-blue p-4">
      <HiMenuAlt2 className="text-5xl cursor-pointer sm:hidden text-white" onClick={handleToggleMobileMenu} />
      <ul className={`${isMobileMenuOpen ? 'block' : 'hidden'} sm:flex sm:space-x-4 text-white ml-auto mr-4`}>
        {isVenueManager && (
          <VenueManagerLinks closeMobileMenu={() => setIsMobileMenuOpen(false)} />
        )}
        <li className="m-4 group">
          <NavLink
            to="/"
            className={`mx-4 transition-all font-bold ${location.pathname === '/' ? 'border-b-2 border-white' : ''}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
        </li>
        <li className="m-4 group">
          <NavLink
            to="/venues"
            className={`mx-4 transition-all font-bold ${location.pathname === '/venues' ? 'border-b-2 border-white' : ''}`}
            onClick={() => {
              setIsMobileMenuOpen(false);
              navigate('/venues', { replace: true });
            }}
          >
            Venues
          </NavLink>
        </li>
        {user && user.role === 'guest' && (
          <>
            <li className="m-4 group">
              <NavLink
                to="/login"
                className={`mx-4 transition-all font-bold ${location.pathname === '/login' ? 'border-b-2 border-white' : ''}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/login', { replace: true });
                }}
              >
                Login
              </NavLink>
            </li>
            <li className="m-4 group">
              <NavLink
                to="/register"
                className={`mx-4 transition-all font-bold ${location.pathname === '/register' ? 'border-b-2 border-white' : ''}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/register', { replace: true });
                }}
              >
                Register
              </NavLink>
            </li>
          </>
        )}
        {user && user.isLoggedIn && (
          <>
            <li className="m-4 group">
              <NavLink
                to="/bookings"
                className={`mx-4 transition-all font-bold ${location.pathname === '/bookings' ? 'border-b-2 border-white' : ''}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate('/bookings', { replace: true });
                }}
              >
                Bookings
              </NavLink>
            </li>
            <li className="m-4 group">
              <NavLink
                to={`/profile/${user.name}`}
                className={`mx-4 transition-all font-bold ${location.pathname === `/profile/${user.name}` ? 'border-b-2 border-white' : ''}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  navigate(`/profile/${user.name}`, { replace: true });
                }}
              >
                Profile
              </NavLink>
            </li>
            <li className="m-4 group">
              <button
                className="mx-4 transition-all font-bold"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handleLogout();
                }}
              >
                {isLogoutConfirmed ? 'Confirm' : 'Logout'}
              </button>
              {isLogoutConfirmed && (
                <button
                  className="mx-4 font-bold text-black"
                  onClick={() => setIsLogoutConfirmed(false)}
                >
                  Cancel
                </button>
              )}
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
