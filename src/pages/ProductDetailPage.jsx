import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notif, setNotif] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:6543/api/produk/${id}`, {
      headers: {
        Authorization: "Bearer token123",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Produk tidak ditemukan");
        return res.json();
      })
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error ambil detail produk:", err);
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  const showNotification = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(null), 1500);
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading product...</p>;
  if (!product)
    return (
      <p style={{ padding: "20px", color: "red" }}>
        ❌ Produk tidak ditemukan.
      </p>
    );

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
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
          src={
            product.gambar || "https://via.placeholder.com/120?text=No+Image"
          }
          alt={product.nama}
          style={{ maxWidth: "250px", borderRadius: "8px" }}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://via.placeholder.com/120?text=No+Image";
          }}
        />
        <div>
          <h1 style={{ fontSize: "22px", fontWeight: "bold" }}>
            {product.nama}
          </h1>
          <p>{product.deskripsi}</p>
          <p style={{ fontSize: "20px", fontWeight: "bold", color: "#e44d26" }}>
            Rp{product.harga.toLocaleString()}
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
                // ✅ Tambahkan ke cart dengan field yang cocok untuk frontend
                addToCart({
                  ...product,
                  title: product.nama,
                  price: product.harga,
                  image: product.gambar,
                  quantity: 1,
                });
                showNotification(`${product.nama} ditambahkan ke keranjang!`);
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
