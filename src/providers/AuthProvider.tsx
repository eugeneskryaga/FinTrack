import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth } from "../lib/firebase/auth";

interface AuthContextValue {
  user: User | null;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
      setIsLoading(false);
    });

    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
