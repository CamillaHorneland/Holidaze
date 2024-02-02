import React, { createContext, useContext, useState } from 'react';
import { useUserActions } from './UserStore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setUser: updateUser, clearUser, useUserStore } = useUserActions();
  const [user, setUser] = useState(useUserStore.getState().user);

  const updateUserContext = (newUser) => {
    setUser((prevUser) => ({ ...prevUser, ...newUser }));
  };

  return (
    <UserContext.Provider value={{ user, updateUser: updateUserContext, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  console.log('User Context:', context); // Legg til denne linjen

  return context;
};












