import React, { createContext, useEffect, useState } from "react";
import api from "../utils/api";
import { getAccess, clearTokens } from "../utils/auth";

export const AuthContext = createContext<any>(null);

export function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function loadUser() {
    const token = await getAccess();

    if (!token) {
      setLoading(false);
      return;
    }

    try {
      const res = await api.get("/auth/user/");
      setUser(res.data);
    } catch (err) {
      await clearTokens();
    }

    setLoading(false);
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
