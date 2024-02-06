import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUserActions } from './UserStore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setUser: setAccessToken, clearUser, useUserStore } = useUserActions();
  const [user, setUser] = useState(useUserStore.getState().user);

  const updateAccessToken = (accessToken, isVenueManager = false) => {
    setUser((prevUser) => ({ ...prevUser, isLoggedIn: true, isVenueManager }));
    setAccessToken(accessToken);
  };

  useEffect(() => {
  
    const handleUserStateChange = () => {
      setUser(useUserStore.getState().user);
    };

    const unsubscribe = useUserStore.subscribe(handleUserStateChange);

    return () => unsubscribe();
  }, []); 

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


















