"use client";

import { createContext, useContext, useState } from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string) => void;
}

interface AuthProviderProps {
  children: React.ReactNode;
  value: {
    token: string;
    refreshToken: string;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children, value }: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(value.token);
  const [refreshToken, setRefreshToken] = useState<string | null>(value.token);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        refreshToken,
        setRefreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  return context as AuthContextType;
}
