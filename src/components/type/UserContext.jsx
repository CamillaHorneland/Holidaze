import React, { createContext, useContext, useState } from 'react';
import { useUserActions } from './UserStore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setUser: setAccessToken, clearUser, useUserStore } = useUserActions();
  const [user, setUser] = useState(useUserStore.getState().user);

  const updateAccessToken = (accessToken) => {
    setUser((prevUser) => ({ ...prevUser, isLoggedIn: true }));
    setAccessToken(accessToken);
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateAccessToken, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }

  return context;
}; 
















