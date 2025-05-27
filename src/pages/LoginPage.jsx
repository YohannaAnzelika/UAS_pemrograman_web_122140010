import { useState } from "react";
import { useUser } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login, logout } = useUser();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUsers, setShowUsers] = useState(false);

  const handleLogin = () => {
    if (!email || !password) {
      alert("Isi email dan password terlebih dahulu.");
      return;
    }

    login(email, password);
    navigate("/profile");
  };

  const handleReset = () => {
    if (
      window.confirm(
        "⚠️ Apakah kamu yakin ingin menghapus semua akun yang tersimpan?"
      )
    ) {
      localStorage.removeItem("users");
      localStorage.removeItem("user");
      logout();
      alert("Semua akun telah dihapus!");
      window.location.reload();
    }
  };

  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>🔐 Login Akun</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginBottom: "10px", width: "100%" }}
      />

      <button
        onClick={handleLogin}
        style={{ width: "100%", marginBottom: "10px" }}
      >
        ✅ Login
      </button>

      <button
        onClick={() => setShowUsers(!showUsers)}
        style={{
          fontSize: "12px",
          border: "none",
          background: "none",
          color: "blue",
          cursor: "pointer",
          marginBottom: "10px",
        }}
      >
        {showUsers
          ? "❌ Sembunyikan akun yang terdaftar"
          : "❓ Lupa akun? Klik di sini"}
      </button>

      {showUsers && (
        <div
          style={{
            background: "#f1f1f1",
            padding: "10px",
            borderRadius: "6px",
          }}
        >
          <h4 style={{ marginBottom: "6px" }}>📧 Email yang terdaftar:</h4>
          <ul>
            {storedUsers.map((u, i) => (
              <li key={i} style={{ fontSize: "14px" }}>
                • {u.email}
              </li>
            ))}
          </ul>
        </div>
      )}

      <hr style={{ margin: "20px 0" }} />

      <button
        onClick={handleReset}
        style={{
          width: "100%",
          backgroundColor: "red",
          color: "white",
          border: "none",
          padding: "10px",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        🗑️ Reset Semua Akun
      </button>
    </div>
  );
};

export default LoginPage;
