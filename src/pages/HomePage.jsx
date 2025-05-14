import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div
      style={{
        paddingTop: "100px",
        textAlign: "center",
        minHeight: "100vh",
        background: "#B0C4DE",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "rgba(0, 0, 0, 0.7)",
          color: "white",
          padding: "40px",
          borderRadius: "10px",
          textAlign: "center",
          width: "80%",
          maxWidth: "600px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        <h1
          style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}
        >
          Welcome to Our E-Commerce Store! 🛍️
        </h1>
        <p style={{ fontSize: "18px", marginBottom: "20px" }}>
          Find the best products at the best prices.
        </p>
        <Link
          to="/products"
          style={{
            backgroundColor: "#FFD700",
            color: "#333",
            padding: "12px 25px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "16px",
            display: "inline-block",
            transition: "0.3s",
          }}
          onMouseEnter={(e) => (e.target.style.background = "#FFC107")}
          onMouseLeave={(e) => (e.target.style.background = "#FFD700")}
        >
          🔍 Browse Products
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
