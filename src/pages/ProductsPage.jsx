import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const { addToCart } = useCart();
  const [notif, setNotif] = useState(null);

  useEffect(() => {
    fetch("http://localhost:6543/api/produk", {
      headers: {
        Authorization: "Bearer token123",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.produk && Array.isArray(data.produk)) {
          setProducts(data.produk);
        } else {
          setProducts([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Gagal fetch produk:", err);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  const showNotification = (message) => {
    setNotif(message);
    setTimeout(() => setNotif(null), 1500);
  };

  const handleMouseMove = (e, id) => {
    if (hoveredId !== id) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    setPosition({
      x: ((offsetX - rect.width / 2) / rect.width) * 10,
      y: ((offsetY - rect.height / 2) / rect.height) * 10,
    });
  };

  if (loading) return <p style={{ padding: "20px" }}>Loading products...</p>;

  return (
    <>
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

      {!loading && products.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px", color: "gray" }}>
          ⚠️ Tidak ada produk ditemukan.
        </p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              background: "white",
              borderRadius: "10px",
              padding: "16px",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
              textAlign: "center",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={() => setHoveredId(product.id)}
            onMouseLeave={() => {
              setHoveredId(null);
              setPosition({ x: 0, y: 0 });
            }}
            onMouseMove={(e) => handleMouseMove(e, product.id)}
          >
            <div
              style={{
                height: "160px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={
                  product.gambar ||
                  "https://via.placeholder.com/120?text=No+Image"
                }
                alt={product.nama || "Produk"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://via.placeholder.com/120?text=No+Image";
                }}
                style={{
                  maxWidth: "120px",
                  transition: "transform 0.1s linear",
                  transform:
                    hoveredId === product.id
                      ? `translate(${position.x}px, ${position.y}px)`
                      : "none",
                }}
              />
            </div>
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
                marginTop: "10px",
                minHeight: "48px",
              }}
            >
              {product.nama || "Tanpa Nama"}
            </h2>
            <p
              style={{
                fontSize: "14px",
                color: "#e44d26",
                fontWeight: "bold",
              }}
            >
              Rp{(product.harga || 0).toLocaleString()}
            </p>

            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "10px",
                marginTop: "10px",
              }}
            >
              <Link
                to={`/products/${product.id}`}
                style={{
                  padding: "8px 12px",
                  background: "#ccc",
                  borderRadius: "6px",
                  textDecoration: "none",
                  color: "black",
                  fontSize: "14px",
                }}
              >
                🔍 Detail
              </Link>
              <button
                onClick={() => {
                  addToCart(product);
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
                🛒 Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
