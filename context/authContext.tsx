"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthLogin } from "@/api/auth";

type AuthContextType = {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const { access_Token } = await AuthLogin(email, password);
      document.cookie = `token=${access_Token}; path=/; max-age=86400`;
      setIsAuthenticated(true);
      router.push("/dashboard");
    } catch (error) {
      alert("Erro ao fazer login");
      console.error(error);
    }
  };

  const logout = () => {
    document.cookie = "token=; path=/; max-age=0";
    setIsAuthenticated(false);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
