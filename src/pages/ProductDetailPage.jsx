import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();
  const [notif, setNotif] = useState(null); // ✅ Notifikasi

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      });
  }, [id]);

  const showNotification = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(null), 1500); // ✅ Auto hilang 1.5 detik
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading product...</p>;

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      {/* 🔔 Notifikasi custom */}
      {notif && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            backgroundColor: "#28a745",
            color: "#fff",
            padding: "10px 16px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
            zIndex: 9999,
            fontSize: "14px",
            transition: "opacity 0.3s ease-in-out",
          }}
        >
          {notif}
        </div>
      )}

      <div
        style={{
          display: "flex",
          gap: "20px",
          background: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        }}
      >
        <img
          src={product.image}
          alt={product.title}
          style={{ maxWidth: "250px", borderRadius: "8px" }}
        />
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
            {product.title}
          </h1>
          <p>{product.description}</p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#e44d26" }}>
            ${product.price.toFixed(2)}
          </p>
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <button
              onClick={() => navigate(-1)}
              style={{
                padding: "8px 12px",
                background: "#ccc",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer",
              }}
            >
              🔙 Back
            </button>
            <button
              onClick={() => {
                addToCart(product);
                showNotification(`${product.title} added to cart!`); // ✅ Notifikasi muncul
              }}
              style={{
                padding: "8px 12px",
                background: "#28a745",
                borderRadius: "6px",
                color: "white",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
              }}
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
