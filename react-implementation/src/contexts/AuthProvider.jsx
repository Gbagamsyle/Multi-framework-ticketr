// src/contexts/AuthProvider.jsx
import React, { useState, useEffect } from "react";
import * as api from "../lib/api";
import { AuthContext } from "./context";

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("ticketapp_session"));
    } catch (e) {
      console.warn("Failed to parse session:", e.message);
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session)
      localStorage.setItem("ticketapp_session", JSON.stringify(session));
    else localStorage.removeItem("ticketapp_session");
  }, [session]);

  const login = async (creds) => {
    setLoading(true);
    try {
      const s = await api.login(creds);
      setSession(s);
      return s;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (creds) => {
    setLoading(true);
    try {
      const s = await api.signup(creds);
      setSession(s);
      return s;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await api.logout();
    setSession(null);
  };

  const isAuthenticated = !!session && session.expiresAt > Date.now();
  const user = session ? { email: session.username } : null

  return (
    <AuthContext.Provider
      value={{ session, user, loading, login, signup, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}
