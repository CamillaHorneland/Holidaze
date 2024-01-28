import React, { createContext, useContext } from 'react';
import useUserStore from './UserStore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { user, setUser } = useUserStore();

  const updateUser = (newUser) => {
    setUser((prevUser) => ({ ...prevUser, ...newUser }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);












