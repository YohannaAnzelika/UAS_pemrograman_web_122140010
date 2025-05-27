import { useState } from "react";
import { Link } from "react-router-dom"; // 🔹 Tambahkan ini!
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000);
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-img" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-description">{product.description}</p>
      <p className="product-price">${product.price.toFixed(2)}</p>

      {/* 🔹 Tombol Add to Cart & Details */}
      <div className="button-container">
        <button className="button" onClick={handleAddToCart}>
          🛒 Add to Cart
        </button>

        <Link to={`/products/${product.id}`} className="button details-button">
          🔍 Details
        </Link>
      </div>

      {/* 🔹 Notifikasi setelah menambah ke keranjang */}
      {showNotification && (
        <div className="notification">✔️ Ditambahkan ke Keranjang!</div>
      )}
    </div>
  );
};

export default ProductCard;
