// import { createContext, useState, useContext } from 'react';

// // Create context
// const AuthContext = createContext();

// // Provider component to wrap your app
// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// // Custom hook to use the AuthContext
// export const useAuth = () => {
//   return useContext(AuthContext);
// };
import { createContext, useState, useContext } from 'react';

// Create context
const AuthContext = createContext();

// Provider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null)
  const [jwtToken, setJwtToken] = useState(null); // Store JWT token

  const login = (token, id) => {
    setIsLoggedIn(true);
    setUserId(id)
    setJwtToken(token); // Set the JWT token upon login
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setJwtToken(null); // Clear the JWT token upon logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, jwtToken, login, logout, userId }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

