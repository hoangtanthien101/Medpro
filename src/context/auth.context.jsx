import { useState, useEffect, createContext } from "react";
import { GoogleAuthProvider, onAuthStateChanged, signInWithRedirect, signOut } from "firebase/auth";
import { auth } from "../firebase";
export const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));

  // Sign in with Google
  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  // Sign out
  const logout = () => {
    setUser(null)
    signOut(auth);
  };

  useEffect(() => {
    const handleStorageChange = () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [user]);
  return (
    <AuthContext.Provider value={{ user, setUser, signInWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
