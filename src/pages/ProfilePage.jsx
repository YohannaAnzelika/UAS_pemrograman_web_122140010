import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const { user, register, logout } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      setEditData({
        name: user.name,
        email: user.email,
        password: user.password || "",
        avatar: user.avatar,
      });
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  const handleRegister = () => {
    if (newUser.name && newUser.email && newUser.password) {
      register(
        newUser.name,
        newUser.email,
        newUser.password,
        newUser.avatar || "https://via.placeholder.com/120"
      );
      localStorage.setItem("userAvatar", newUser.avatar);
    } else {
      alert("Harap isi nama, email, dan password.");
    }
  };

  const handleLogin = () => {
    const storedUsers = JSON.parse(localStorage.getItem("userList")) || [];
    const found = storedUsers.find(
      (u) => u.email === loginData.email && u.password === loginData.password
    );

    if (found) {
      register(found.name, found.email, found.password, found.avatar);
      localStorage.setItem("user", JSON.stringify(found));
      localStorage.setItem("userAvatar", found.avatar);
    } else {
      alert("Login gagal. Email atau password salah.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, avatar: reader.result });
        localStorage.setItem("userAvatar", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Jika belum login: tampilkan form login dan daftar
  if (!user) {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.card}>
          <h2 className={styles.title}>🔐 Login Akun</h2>
          <input
            type="email"
            placeholder="Email"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
            className={styles.input}
          />
          <button onClick={handleLogin} className={styles.buttonPrimary}>
            ✅ Login
          </button>

          <hr style={{ margin: "20px 0" }} />

          <h3 className={styles.title}>📝 Belum punya akun?</h3>
          <input
            type="text"
            placeholder="Nama"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className={styles.input}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            className={styles.input}
          />
          <button onClick={handleRegister} className={styles.buttonSecondary}>
            📝 Daftar
          </button>
        </div>
      </div>
    );
  }

  // ✅ Jika sudah login: tampilkan profil
  return (
    <div className={styles.profileContainer}>
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          <label className={styles.avatarLabel}>
            <img
              src={
                editData.avatar ||
                localStorage.getItem("userAvatar") ||
                "https://via.placeholder.com/120"
              }
              alt="Profile"
              className={styles.avatar}
            />
            {isEditing && (
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className={styles.hiddenInput}
              />
            )}
          </label>
        </div>
        {isEditing ? (
          <>
            <input
              type="text"
              value={editData.name}
              onChange={(e) =>
                setEditData({ ...editData, name: e.target.value })
              }
              className={styles.input}
            />
            <input
              type="email"
              value={editData.email}
              onChange={(e) =>
                setEditData({ ...editData, email: e.target.value })
              }
              className={styles.input}
            />
            <input
              type="password"
              value={editData.password}
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              className={styles.input}
            />
            <button
              onClick={() => {
                register(
                  editData.name,
                  editData.email,
                  editData.password,
                  editData.avatar
                );
                setIsEditing(false);
                localStorage.setItem("userAvatar", editData.avatar);
              }}
              className={styles.buttonSuccess}
            >
              ✅ Simpan
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className={styles.buttonDanger}
            >
              ❌ Batal
            </button>
          </>
        ) : (
          <>
            <h2 className={styles.title}>{user.name}</h2>
            <p className={styles.email}>{user.email}</p>
            <button
              onClick={() => setIsEditing(true)}
              className={styles.buttonPrimary}
            >
              ✏️ Edit Profil
            </button>
          </>
        )}
        <button
          onClick={() => {
            logout();
            localStorage.removeItem("user");
            localStorage.removeItem("userAvatar");
          }}
          className={styles.buttonDanger}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;
