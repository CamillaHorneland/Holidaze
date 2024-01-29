import React from 'react';
import { NavLink } from 'react-router-dom';
import logoImage from '../../../assets/Holidaze.png';

const Logo = () => {
  return (
    <div className="logo-container p-5 bg-blue">
      <NavLink to="/" className="flex items-center">
        <img src={logoImage} alt="Logo" className="h-8 w-auto mx-auto sm:mx-0" />
      </NavLink>
    </div>
  );
};

export default Logo;


