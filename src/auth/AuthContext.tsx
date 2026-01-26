import React, { createContext, useContext, useEffect, useState } from "react";
import { login as apiLogin, register as apiRegister } from "../api/auth";
import { saveAuth, getToken, getEmail, clearAuth } from "./storage";
import type { AuthResponse, AuthState } from "../types/auth-types";

const Ctx = createContext<AuthState | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  useEffect(() => {
    setToken(getToken());
    setEmail(getEmail());
  }, []);

  async function doLogin(email: string, password: string) {
    const data: AuthResponse = await apiLogin(email, password);
    saveAuth(data.access_token, email);
    setToken(data.access_token);
    setEmail(email);
  }

  async function doRegister(email: string, password: string) {
    const data: AuthResponse = await apiRegister(email, password);
    saveAuth(data.access_token, email);
    setToken(data.access_token);
    setEmail(email);
  }

  function logout() {
    clearAuth();
    setToken(null);
    setEmail(null);
  }

  return (
    <Ctx.Provider
      value={{ token, email, login: doLogin, register: doRegister, logout }}>
      {children}
    </Ctx.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>");
  return ctx;
}
