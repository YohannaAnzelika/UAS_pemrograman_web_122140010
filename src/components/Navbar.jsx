import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(to right, #2c3e50, #4ca1af)",
        color: "white",
        fontSize: "16px",
        fontWeight: "bold",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "12px 32px", // Tambah padding kanan
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        height: "65px",
        boxSizing: "border-box",
        overflow: "visible", // Pastikan tidak nge-cut teks
      }}
    >
      {/* Logo */}
      <Link
        to="/"
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          letterSpacing: "0.5px",
          textDecoration: "none",
          color: "white",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          whiteSpace: "nowrap",
        }}
      >
        🛒 <span>ShopEase</span>
      </Link>

      {/* Menu Items */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          whiteSpace: "nowrap",
        }}
      >
        <NavItem to="/" icon="🏠" label="Home" />
        <NavItem to="/products" icon="🛍️" label="Products" />
        <NavItem to="/cart" icon="🛒" label="Cart" />
        <NavItem to="/profile" icon="👤" label="Profile" />
      </div>
    </nav>
  );
};

// Komponen untuk item navbar
const NavItem = ({ to, icon, label }) => {
  return (
    <Link
      to={to}
      style={{
        color: "white",
        textDecoration: "none",
        padding: "8px 10px",
        borderRadius: "6px",
        fontSize: "16px",
        whiteSpace: "nowrap",
        transition: "all 0.3s ease",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}
      onMouseEnter={(e) =>
        (e.target.style.background = "rgba(255, 255, 255, 0.2)")
      }
      onMouseLeave={(e) => (e.target.style.background = "transparent")}
    >
      {icon} {label}
    </Link>
  );
};

export default Navbar;
