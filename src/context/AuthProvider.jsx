import { createContext, useContext, useState } from "react";

// 1. Buat Context
const AuthContext = createContext();

// 2. Buat Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom Hook untuk Menggunakan AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
