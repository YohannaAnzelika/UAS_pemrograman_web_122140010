import { useState } from "react";
import { useCart } from "../context/CartContext";
import "./CartPage.css";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);

  // ✅ Hitung total harga
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // ✅ Checkout -> Munculkan modal pembayaran
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Keranjang belanja kosong! Tambahkan item sebelum checkout.");
      return;
    }
    setShowPaymentOptions(true);
  };

  // ✅ Konfirmasi pembayaran -> Kosongkan cart
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
            <div key={item.id} className="cart-item">
              <img
                src={item.image}
                alt={item.title}
                className="cart-item-img"
              />
              <div className="cart-item-info">
                <h3>{item.title}</h3>
                <p>${item.price.toFixed(2)}</p>
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    ➖
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    ➕
                  </button>
                </div>
              </div>
              {/* ✅ Hapus item dari cart */}
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
            {/* ✅ Tombol Checkout */}
            <button className="checkout-btn" onClick={handleCheckout}>
              💳 Proceed to Checkout
            </button>
          </div>
        </div>
      )}

      {/* ✅ Modal Pilihan Pembayaran */}
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
