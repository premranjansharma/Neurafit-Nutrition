import { createContext, useContext, useState } from "react";

const API = "http://localhost:5000";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken]     = useState(localStorage.getItem("token") || null);

  // ✅ FIX: async login — backend se real JWT token lega
  const login = async (email, password) => {
    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) return false;

      // ✅ Token localStorage mein save karo
      localStorage.setItem("token", data.token);
      setToken(data.token);
      setIsAdmin(data.role === "admin");
      return true;

    } catch (err) {
      console.error("Login error:", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isAdmin, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}