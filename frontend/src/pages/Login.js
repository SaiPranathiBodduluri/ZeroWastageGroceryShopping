import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });
      if (res.data.success) {
        navigate("/home");
      } else {
        alert("Login failed: " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "#f4f4f4" }}>
      
      {/* Header */}
      <header style={{ textAlign: "center", marginBottom: "30px" }}>
        <h1 style={{ color: "#2e7d32" }}>Zero Waste Grocery Shopping App</h1>
        <p style={{ color: "#555", fontStyle: "italic" }}>
          Buy unsold or near-expiry groceries at discounted prices. Help reduce waste and save money!
        </p>
      </header>

      {/* Login Form */}
      <form onSubmit={handleLogin} style={{ background: "white", padding: "30px", borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.1)", width: "300px" }}>
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: "8px", marginBottom: "15px", borderRadius: "5px", border: "1px solid #ccc" }}
        />
        <button type="submit" style={{ width: "100%", padding: "10px", backgroundColor: "#2e7d32", color: "white", border: "none", borderRadius: "5px", fontWeight: "bold" }}>
          Login
        </button>

        {/* Links */}
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <p>
            Don't have an account? <Link to="/signup" style={{ color: "#2e7d32", fontWeight: "bold" }}>Signup</Link>
          </p>
          <p>
            <Link to="/forgot-password" style={{ color: "#2e7d32", fontWeight: "bold" }}>Forgot Password?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
