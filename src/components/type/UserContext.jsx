import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ role: 'guest', isVenueManager: false });

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






