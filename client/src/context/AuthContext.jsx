import { createContext, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    localStorage.setItem("jwt", res.data.token);
    setUser(res.data.user);
    navigate("/dashboard");
  };

  const register = async (data) => {
    const res = await api.post("/auth/register", data);
    localStorage.setItem("jwt", res.data.token);
    setUser(res.data.user);
    navigate("/dashboard");
  };

  return (
    <AuthContext.Provider value={{ user, login, register }}>
      {children}
    </AuthContext.Provider>
  );
}
