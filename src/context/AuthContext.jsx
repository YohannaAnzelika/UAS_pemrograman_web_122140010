import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigate = useNavigate(); // Pastikan ini ada di dalam komponen

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const login = (email, password) => {
    const dummyUser = { name: "Johanna", email: "hana@example.com" };
    if (email === dummyUser.email && password === "password123") {
      setUser(dummyUser);
      localStorage.setItem("user", JSON.stringify(dummyUser));
      alert("✅ Login berhasil!");
      navigate("/profile");
    } else {
      alert("❌ Email atau password salah!");
    }
  };

  const register = (name, email, password) => {
    if (!name || !email || !password) {
      alert("⚠️ Semua field harus diisi!");
      return;
    }
    const newUser = { name, email };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    alert("✅ Pendaftaran berhasil! Silakan login.");
    navigate("/login");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    alert("👋 Logout berhasil!");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
