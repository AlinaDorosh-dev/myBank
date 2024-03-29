/**
 * @fileoverview This file contains the AuthProvider component which is used to provide the auth state to all components that need it
 */
import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  let token = sessionStorage.getItem("auth");
  const [auth, setAuth] = useState(token);
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
