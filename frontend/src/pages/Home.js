import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  // Fetch products from backend
  useEffect(() => {
    axios
      .get("https://zero-wastage-grocery-backend.vercel.app/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const showMessage = (message) => {
    setPopupMessage(message);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 2000);
  };

  const addToCart = (product) => {
    setCart((prev) => {
      const exist = prev.find((item) => item._id === product._id);
      if (exist) {
        showMessage("Quantity updated in cart!");
        return prev.map((item) =>
          item._id === product._id ? { ...item, qty: item.qty + 1 } : item
        );
      } else {
        showMessage("Item added to your cart!");
        return [...prev, { ...product, qty: 1 }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
    showMessage("Item removed from your cart!");
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handlePlaceOrder = () => {
    if (cart.length === 0) {
      showMessage("Your cart is empty!");
      return;
    }
    setCart([]);
    showMessage("✅ Order placed successfully!");
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "Arial, sans-serif", minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      
      {/* Navbar */}
      <header
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          padding: "15px 25px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Hamburger icon */}
        <div
          onClick={() => setSidebarOpen(true)}
          style={{
            cursor: "pointer",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "25px",
            height: "18px",
          }}
        >
          <span style={{ display: "block", height: "3px", backgroundColor: "white" }}></span>
          <span style={{ display: "block", height: "3px", backgroundColor: "white" }}></span>
          <span style={{ display: "block", height: "3px", backgroundColor: "white" }}></span>
        </div>

        <h2 style={{ margin: "0 auto", textAlign: "center" }}>Zero Wastage Grocery</h2>

        <button
          onClick={handleLogout}
          style={{
            backgroundColor: "white",
            color: "#2e7d32",
            border: "none",
            padding: "8px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Logout
        </button>
      </header>

      {/* Search Bar */}
      <div style={{ textAlign: "center", padding: "15px", backgroundColor: "#f0f0f0" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "60%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
          }}
        />
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            zIndex: 900,
          }}
        ></div>
      )}

      {/* Sidebar */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: sidebarOpen ? 0 : "-100%",
          width: "300px",
          height: "100%",
          backgroundColor: "#fff",
          boxShadow: "2px 0 6px rgba(0,0,0,0.3)",
          padding: "20px",
          transition: "left 0.3s ease",
          zIndex: 1000,
        }}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          style={{ marginBottom: "15px", cursor: "pointer", background: "none", border: "none", fontSize: "18px" }}
        >
          ✕ Close
        </button>

        <h3>Your Cart</h3>
        {cart.length === 0 && <p>No items in cart</p>}
        <ul style={{ listStyle: "none", padding: 0 }}>
          {cart.map((item) => (
            <li key={item._id} style={{ marginBottom: "10px" }}>
              <div>
                <strong>{item.name}</strong> x{item.qty} = ₹{item.price * item.qty}
              </div>
              <small>Expiry: {item.expiry || "N/A"}</small>
              <button
                onClick={() => removeFromCart(item._id)}
                style={{
                  backgroundColor: "transparent",
                  color: "black",
                  border: "none",
                  padding: "5px 10px",
                  borderRadius: "5px",
                  marginLeft: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
        <p><strong>Total: ₹{total}</strong></p>
        <button
          onClick={handlePlaceOrder}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#2e7d32",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          Place Order
        </button>
      </div>

      {/* Product Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div
              key={p._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: "100%",
                  height: "150px",
                  objectFit: "cover",
                  marginBottom: "10px",
                  borderRadius: "6px",
                }}
              />
              <h3>{p.name}</h3>
              <p>
                <span style={{ color: "#e53935", fontWeight: "bold" }}>₹{p.price}</span>{" "}
                <span style={{ textDecoration: "line-through", color: "gray", fontSize: "14px" }}>₹{p.oldPrice}</span>
              </p>
              <p><small>Expiry: {p.expiry || "N/A"}</small></p>
              <button
                onClick={() => addToCart(p)}
                style={{
                  backgroundColor: "#2e7d32",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: "1/-1", textAlign: "center" }}>No products found</p>
        )}
      </div>

      {/* Popup Message */}
      {showPopup && (
        <div
          style={{
            position: "fixed",
            bottom: "30px",
            right: "30px",
            backgroundColor: "#2e7d32",
            color: "white",
            padding: "12px 20px",
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.3)",
            zIndex: 2000,
            transition: "opacity 0.3s ease",
          }}
        >
          {popupMessage}
        </div>
      )}

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#2e7d32",
          color: "white",
          textAlign: "center",
          padding: "15px",
          marginTop: "auto",
        }}
      >
        <p>Follow us on:</p>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px" }}>
          <img src="https://cdn-icons-png.flaticon.com/512/733/733547.png" alt="Facebook" style={{ width: "30px" }} />
          <img src="https://cdn-icons-png.flaticon.com/512/174/174855.png" alt="Instagram" style={{ width: "30px" }} />
          <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" style={{ width: "30px" }} />
        </div>
        <p style={{ marginTop: "10px", fontSize: "14px" }}>© 2025 Zero Wastage Grocery | All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
