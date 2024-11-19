"use client";

import axios, { AxiosResponse } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

interface UserProfile {
  sub: string;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  email: string;
  email_verified: boolean;
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  refreshToken: string | null;
  setRefreshToken: (token: string | null) => void;
  profile: UserProfile | null;
  setProfile: (userProfile: UserProfile | null) => void;
  isLoadingProfile: boolean;
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
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(!!token);

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingProfile(true);

      const res: AxiosResponse<UserProfile> = await axios.get(
        "/api/auth/google/profile",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (res.data) {
        setProfile(res.data);
      }

      setIsLoadingProfile(false);
    };

    if (token && !profile) {
      fetchUser();
    }
  }, [token, profile]);

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken,
        refreshToken,
        setRefreshToken,
        profile,
        setProfile,
        isLoadingProfile,
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
