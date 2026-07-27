import { createContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../lib/firebase/auth";
import { getUserProfile } from "../../features/users/services/user.service";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../../features/auth/services/auth.service";
import { type UserProfile } from "../../types/user";
import { type RegisterData } from "../../types/auth";

interface AuthContextValue {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      try {
        if (!firebaseUser) {
          setUser(null);
          setIsLoading(false);
          return;
        }

        const profile = await getUserProfile(firebaseUser.uid);

        setUser(profile);
      } catch (error) {
        console.error("Failed to get user profile:", error);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const register = async (data: RegisterData) => {
    const profile = await registerUser(data);
    setUser(profile);
  };

  const login = async (email: string, password: string) => {
    const firebaseUser = await loginUser({
      email,
      password,
    });

    if (!firebaseUser) {
      throw new Error("Login failed");
    }

    const profile = await getUserProfile(firebaseUser.uid);
    setUser(profile);
  };

  const logout = async () => {
    await logoutUser();

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
