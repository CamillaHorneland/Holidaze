import React, { createContext, useContext, useState } from 'react';
import { useUserActions } from './UserStore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { setAccessToken, clearUser, useUserStore } = useUserActions();
  const [user, setUser] = useState(useUserStore.getState().user);

  const updateAccessToken = (accessToken) => {
    setAccessToken(accessToken);
    setUser((prevUser) => ({ ...prevUser, isLoggedIn: true }));
  };

  return (
    <UserContext.Provider value={{ user,setUser, updateAccessToken, clearUser }}>
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


// import React, { createContext, useContext, useState } from 'react';
// import { useUserActions } from './UserStore';

// const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const { setUser: updateUser, clearUser, useUserStore } = useUserActions();
//   const [user, setUser] = useState(useUserStore.getState().user);

//   const updateUserContext = (newUser) => {
//     setUser((prevUser) => ({ ...prevUser, ...newUser }));
//   };

//   return (
//     <UserContext.Provider value={{ user, updateUser: updateUserContext, clearUser }}>
//       {children}
//     </UserContext.Provider>
//   );
// };

// export const useUser = () => {
//   const context = useContext(UserContext);

//   if (!context) {
//     throw new Error('useUser must be used within a UserProvider');
//   }

//   return context;
// };












