import { createContext, useContext, useState } from "react";

// ✅ 1. Buat Context
const NotificationContext = createContext();

// ✅ 2. Provider untuk membungkus aplikasi
export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState("");

  // ✅ Fungsi untuk menampilkan notifikasi
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000); // Notifikasi hilang setelah 2 detik
  };

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
      {notification && <div className="notification-popup">{notification}</div>}
    </NotificationContext.Provider>
  );
};

// ✅ 3. Custom Hook untuk menggunakan Notifikasi
export const useNotification = () => useContext(NotificationContext);
