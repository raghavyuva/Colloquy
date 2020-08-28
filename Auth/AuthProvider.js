import React, { createContext, useState } from "react";

import { firebase } from "../Auth/config";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login: async (email, password) => {
          try {
            await firebase.auth().signInWithEmailAndPassword(email, password);
          } catch (e) {
           alert(e)
          }
        },
        register: async (email, password) => {
          try {
            await firebase
              .auth()
              .createUserWithEmailAndPassword(email, password);
          } catch (e) {
            alert(e)
          }
        },
        logout: async () => {
          try {
            await firebase.auth().signOut();
          } catch (e) {
            alert(e)
          }
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
