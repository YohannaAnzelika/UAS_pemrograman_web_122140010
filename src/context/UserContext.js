import { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Ambil user dari localStorage saat pertama kali aplikasi dimuat
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const register = (
    name,
    email,
    avatar = "https://via.placeholder.com/120"
  ) => {
    const newUser = { name, email, avatar };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser)); // Simpan ke localStorage tanpa password
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Hapus user dari localStorage
  };

  return (
    <UserContext.Provider value={{ user, register, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
