import {useState,React} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import CartPage from "./pages/CartPage";
import ForgotPassword from "./pages/ForgotPassword"; // new page

function App() {
  const [cart, setCart] = useState([]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
        <Route path="/forgot-password" element={<ForgotPassword />} /> {/* new route */}
      </Routes>
    </Router>
  );
}

export default App;
