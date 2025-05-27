import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ⏳ Ambil user dari localStorage saat awal render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Gagal parsing user:", e);
        localStorage.removeItem("user");
      }
    }
  }, []);

  // ✅ Hanya fungsi register — tidak ada login
  const register = (
    name,
    email,
    password,
    avatar = "https://via.placeholder.com/120"
  ) => {
    const newUser = { name, email, password, avatar };
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    const emailUsed = storedUsers.some((u) => u.email === email);
    if (emailUsed) {
      alert("Email sudah digunakan.");
      return;
    }

    const updatedUsers = [...storedUsers, newUser];

    try {
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      localStorage.setItem("user", JSON.stringify(newUser));
      setUser(newUser);
    } catch (e) {
      if (e.name === "QuotaExceededError") {
        alert("Penyimpanan penuh. Tidak bisa menyimpan akun.");
      }
    }
  };

  // 🚪 Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
