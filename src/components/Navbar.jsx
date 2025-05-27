import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsOpen(false); // Tutup menu kalau ganti ke desktop
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        background: "linear-gradient(to right, #2c3e50, #4ca1af)",
        color: "white",
        padding: "12px 20px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            textDecoration: "none",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          🛒 <span>ShopEase</span>
        </Link>

        {/* Hamburger Button */}
        {isMobile && (
          <button
            onClick={toggleMenu}
            style={{
              fontSize: "24px",
              background: "none",
              border: "none",
              color: "white",
              cursor: "pointer",
            }}
          >
            ☰
          </button>
        )}

        {/* Menu */}
        <div
          style={{
            display: isMobile ? (isOpen ? "flex" : "none") : "flex",
            flexDirection: isMobile ? "column" : "row",
            position: isMobile ? "absolute" : "static",
            top: isMobile ? "65px" : "auto",
            left: 0,
            width: isMobile ? "100%" : "auto",
            background: isMobile ? "rgba(44, 62, 80, 0.95)" : "transparent",
            padding: isMobile ? "16px 0" : "0",
            alignItems: isMobile ? "center" : "flex-end",
            gap: "16px",
            zIndex: 999,
          }}
        >
          <NavItem to="/" icon="🏠" label="Home" />
          <NavItem to="/products" icon="🛍️" label="Products" />
          <NavItem to="/cart" icon="🛒" label="Cart" />
          <NavItem to="/profile" icon="👤" label="Profile" />
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, icon, label }) => (
  <Link
    to={to}
    style={{
      color: "white",
      textDecoration: "none",
      padding: "8px 10px",
      borderRadius: "6px",
      fontSize: "16px",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      transition: "background 0.3s ease",
    }}
    onMouseEnter={(e) =>
      (e.target.style.background = "rgba(255, 255, 255, 0.2)")
    }
    onMouseLeave={(e) => (e.target.style.background = "transparent")}
  >
    {icon} {label}
  </Link>
);

export default Navbar;
