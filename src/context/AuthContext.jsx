import React, { createContext, useContext } from "react";
import { useState, useEffect } from "react";
import { onUserStateChange, GoogleLogin, GoogleLogout } from "../api/firebase";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    onUserStateChange((user) => {
      console.log("user : ", user);
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, GoogleLogin, GoogleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
