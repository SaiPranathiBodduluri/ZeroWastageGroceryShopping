import React, { useState } from "react";

function CartPage({ cart, setCart }) {
  const [message, setMessage] = useState("");

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      setMessage("No items to place an order.");
    } else {
      setCart([]); // Clear cart after placing order
      setMessage("✅ Order placed successfully!");
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item._id !== id));
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Your Cart</h2>

      {message && (
        <div
          style={{
            backgroundColor: "#e8f5e9",
            color: "#2e7d32",
            padding: "10px",
            margin: "10px 0",
            borderRadius: "8px",
          }}
        >
          {message}
        </div>
      )}

      {cart.length === 0 ? (
        <p style={{ fontSize: "18px", color: "gray" }}>🛒 No items in your cart</p>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                marginBottom: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <h3>{item.name}</h3>
                <p>
                  Price: ₹{item.price} | Quantity: {item.quantity || 1}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  backgroundColor: "transparent",
                  border: "none",
                  fontSize: "20px",
                  cursor: "pointer",
                }}
              >
                ✖
              </button>
            </div>
          ))}

          <button
            onClick={handlePlaceOrder}
            style={{
              marginTop: "20px",
              backgroundColor: "#2e7d32",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
