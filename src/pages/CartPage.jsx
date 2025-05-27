import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // ✅ Hitung total harga dengan pengecekan aman
  const totalPrice = cart.reduce((total, item) => {
    const price = typeof item.price === "number" ? item.price : 0;
    const qty = typeof item.quantity === "number" ? item.quantity : 1;
    return total + price * qty;
  }, 0);

  // ✅ Handle Checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang belanja kosong! Tambahkan item sebelum checkout.");
      return;
    }
    setShowPaymentOptions(true);
  };

  // ✅ Konfirmasi pembayaran
  const confirmPayment = (method) => {
    alert(
      `✅ Pembayaran berhasil dengan ${method}!\nTotal: $${totalPrice.toFixed(
        2
      )}`
    );
    clearCart();
    setShowPaymentOptions(false);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-title">🛒 Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="cart-empty">Keranjang belanja kosong.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <div key={item?.id || Math.random()} className="cart-item">
              <img
                src={item?.image || "https://via.placeholder.com/100"}
                alt={item?.title || "Produk"}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h3>{item?.title || "Tanpa Nama"}</h3>
                <p>
                  $
                  {typeof item.price === "number"
                    ? item.price.toFixed(2)
                    : "0.00"}
                </p>
                <div className="quantity-controls">
                  <button
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        Math.max((item.quantity || 1) - 1, 1)
                      )
                    }
                  >
                    ➖
                  </button>
                  <span>{item?.quantity || 1}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.id, (item.quantity || 1) + 1)
                    }
                  >
                    ➕
                  </button>
                </div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
              >
                ❌ Remove
              </button>
            </div>
          ))}

          <div className="cart-footer">
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button className="checkout-btn" onClick={handleCheckout}>
              💳 Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {showPaymentOptions && (
        <div className="payment-modal">
          <div className="modal-content">
            <h2>Pilih Metode Pembayaran</h2>
            <button
              className="payment-btn"
              onClick={() => confirmPayment("🏦 Transfer Bank")}
            >
              🏦 Transfer Bank
            </button>
            <button
              className="payment-btn"
              onClick={() => confirmPayment("📱 E-Wallet (Gopay, OVO, Dana)")}
            >
              📱 E-Wallet
            </button>
            <button
              className="payment-btn"
              onClick={() => confirmPayment("🚚 COD (Bayar di tempat)")}
            >
              🚚 COD
            </button>
            <button
              className="close-modal"
              onClick={() => setShowPaymentOptions(false)}
            >
              ❌ Batal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
